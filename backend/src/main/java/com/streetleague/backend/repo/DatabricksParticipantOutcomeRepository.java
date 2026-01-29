package com.streetleague.backend.repo;

import com.streetleague.backend.model.ParticipantOutcomeRowDto;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
@Profile("databricks")
public class DatabricksParticipantOutcomeRepository {

  private final NamedParameterJdbcTemplate namedJdbc;

  public DatabricksParticipantOutcomeRepository(NamedParameterJdbcTemplate namedJdbc) {
    this.namedJdbc = namedJdbc;
  }

  // Helpers (Databricks JDBC often returns numbers as BigDecimal)
  private Long longOrNull(ResultSet rs, String col) throws SQLException {
    BigDecimal bd = rs.getBigDecimal(col);
    return bd == null ? null : bd.longValue();
  }

  private Integer intOrNull(ResultSet rs, String col) throws SQLException {
    BigDecimal bd = rs.getBigDecimal(col);
    return bd == null ? null : bd.intValue();
  }

  private Double dblOrNull(ResultSet rs, String col) throws SQLException {
    BigDecimal bd = rs.getBigDecimal(col);
    return bd == null ? null : bd.doubleValue();
  }

  private Boolean boolOrNull(ResultSet rs, String col) throws SQLException {
    Object o = rs.getObject(col);
    if (o == null) return null;
    if (o instanceof Boolean b) return b;
    if (o instanceof BigDecimal bd) return bd.intValue() != 0;
    if (o instanceof Number n) return n.intValue() != 0;
    return Boolean.parseBoolean(o.toString());
  }

  public List<ParticipantOutcomeRowDto> search(String participantId, String cohortId, String outcomeName) {

    String sql = """
      SELECT
        p.participant_id,
        p.participant_code,
        p.cohort_id,
        p.age_band,
        p.employment_status_at_entry,
        p.education_level_at_entry,
        p.referral_source,
        p.completion_status,
        p.enrollment_date,

        c.cohort_code,

        o.outcome_id,
        o.outcome_type_id,
        o.outcome_date,
        o.weeks_from_program_end,
        o.sector,
        o.hours_per_week,
        o.salary_band,
        o.employer_type,
        o.recorded_by_staff_id,
        o.is_sustained_13_weeks,
        o.is_sustained_26_weeks,

        ot.outcome_type_id AS ot_outcome_type_id,
        ot.outcome_name,
        ot.outcome_code,
        ot.outcome_category,
        ot.description AS outcome_type_description,

        s.staff_id,
        s.staff_code

      FROM hackathon.emea.participant p
      JOIN hackathon.emea.cohort c
        ON p.cohort_id = c.cohort_id
      JOIN hackathon.emea.outcome o
        ON p.participant_id = o.participant_id
      JOIN hackathon.emea.outcome_type ot
        ON o.outcome_type_id = ot.outcome_type_id
      JOIN hackathon.emea.staff s
        ON o.recorded_by_staff_id = s.staff_id

      WHERE p.is_active = true
        AND o.is_active = true
        AND ot.is_active = true
        AND s.is_active = true

        AND (
              :participant_id IS NULL OR trim(:participant_id) = '' OR
              p.participant_id = try_cast(:participant_id AS BIGINT)
            )
        AND (
              :cohort_id IS NULL OR trim(:cohort_id) = '' OR
              p.cohort_id = try_cast(:cohort_id AS BIGINT)
            )
        AND (
              :outcome_name IS NULL OR trim(:outcome_name) = '' OR
              ot.outcome_name = :outcome_name
            )

      ORDER BY p.participant_id, o.outcome_date
    """;

    MapSqlParameterSource params = new MapSqlParameterSource()
        .addValue("participant_id", participantId)
        .addValue("cohort_id", cohortId)
        .addValue("outcome_name", outcomeName);

    return namedJdbc.query(sql, params, (rs, rowNum) -> {
      ParticipantOutcomeRowDto d = new ParticipantOutcomeRowDto();

      d.participant_id = longOrNull(rs, "participant_id");
      d.participant_code = rs.getString("participant_code");
      d.cohort_id = longOrNull(rs, "cohort_id");
      d.age_band = rs.getString("age_band");
      d.employment_status_at_entry = rs.getString("employment_status_at_entry");
      d.education_level_at_entry = rs.getString("education_level_at_entry");
      d.referral_source = rs.getString("referral_source");
      d.completion_status = rs.getString("completion_status");
      d.enrollment_date = String.valueOf(rs.getObject("enrollment_date"));

      d.cohort_code = rs.getString("cohort_code");

      d.outcome_id = longOrNull(rs, "outcome_id");
      d.outcome_type_id = longOrNull(rs, "outcome_type_id");
      d.outcome_date = String.valueOf(rs.getObject("outcome_date"));
      d.weeks_from_program_end = intOrNull(rs, "weeks_from_program_end");
      d.sector = rs.getString("sector");
      d.hours_per_week = dblOrNull(rs, "hours_per_week");
      d.salary_band = rs.getString("salary_band");
      d.employer_type = rs.getString("employer_type");
      d.recorded_by_staff_id = longOrNull(rs, "recorded_by_staff_id");
      d.is_sustained_13_weeks = boolOrNull(rs, "is_sustained_13_weeks");
      d.is_sustained_26_weeks = boolOrNull(rs, "is_sustained_26_weeks");

      d.ot_outcome_type_id = longOrNull(rs, "ot_outcome_type_id");
      d.outcome_name = rs.getString("outcome_name");
      d.outcome_code = rs.getString("outcome_code");
      d.outcome_category = rs.getString("outcome_category");
      d.outcome_type_description = rs.getString("outcome_type_description");

      d.staff_id = longOrNull(rs, "staff_id");
      d.staff_code = rs.getString("staff_code");

      return d;
    });
  }
}
