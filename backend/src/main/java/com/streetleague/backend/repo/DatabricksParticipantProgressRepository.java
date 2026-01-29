package com.streetleague.backend.repo;

import com.streetleague.backend.model.ParticipantProgressRowDto;
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
public class DatabricksParticipantProgressRepository {

  private final NamedParameterJdbcTemplate namedJdbc;

  public DatabricksParticipantProgressRepository(NamedParameterJdbcTemplate namedJdbc) {
    this.namedJdbc = namedJdbc;
  }

  // helpers to avoid BigDecimal cast errors
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

  public List<ParticipantProgressRowDto> search(String participantId, String cohortId, String lessonTitle) {

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

        a.attendance_id,
        a.session_id,
        a.attendance_status,
        a.participation_level,
        a.left_early,
        a.behaviour_notes,

        ss.lesson_plan_id,
        lp.lesson_title,

        c.cohort_code,

        pro.progress_id,
        pro.week_number,
        pro.progress_date,
        pro.attendance_rate_pct,
        pro.engagement_score,
        pro.confidence_score,
        pro.motivation_score,
        pro.skills_progress_score,
        pro.overall_progress,
        pro.barriers_identified,
        pro.support_provided,
        pro.recorded_by_staff_id,

        s.staff_id,
        s.staff_code,
        s.city_id,

        sa.achievement_id,
        sa.skill_id,
        sa.initial_proficiency,
        sa.current_proficiency,
        sa.target_proficiency,
        sa.first_assessed_date,
        sa.achievement_status,
        sa.last_assessed_date,
        sa.verified_by_staff_id,

        sk.skill_name,
        sk.skill_category_id,

        sc.category_name,
        sc.category_code,
        sc.description AS skill_category_description

      FROM hackathon.emea.participant p
      JOIN hackathon.emea.attendance a
        ON p.participant_id = a.participant_id
      JOIN hackathon.emea.session ss
        ON a.session_id = ss.session_id
      JOIN hackathon.emea.lesson_plan lp
        ON ss.lesson_plan_id = lp.lesson_plan_id
      JOIN hackathon.emea.cohort c
        ON ss.cohort_id = c.cohort_id
      JOIN hackathon.emea.progress pro
        ON p.participant_id = pro.participant_id
      JOIN hackathon.emea.staff s
        ON pro.recorded_by_staff_id = s.staff_id
      JOIN hackathon.emea.skill_achievement sa
        ON p.participant_id = sa.participant_id
      JOIN hackathon.emea.skill sk
        ON sa.skill_id = sk.skill_id
      JOIN hackathon.emea.skill_category sc
        ON sk.skill_category_id = sc.skill_category_id

      WHERE p.is_active = true
        AND a.is_active = true
        AND ss.is_active = true
        AND lp.is_active = true
        AND c.is_active = true
        AND pro.is_active = true
        AND s.is_active = true
        AND sa.is_active = true
        AND sk.is_active = true
        AND sc.is_active = true

        AND (
              :participant_id IS NULL OR trim(:participant_id) = '' OR
              p.participant_id = try_cast(:participant_id AS BIGINT)
            )
        AND (
              :cohort_id IS NULL OR trim(:cohort_id) = '' OR
              p.cohort_id = try_cast(:cohort_id AS BIGINT)
            )
        AND (
              :lesson_title IS NULL OR trim(:lesson_title) = '' OR
              lp.lesson_title = :lesson_title
            )

      ORDER BY p.participant_id, ss.session_id
    """;

    MapSqlParameterSource p = new MapSqlParameterSource()
        .addValue("participant_id", participantId)
        .addValue("cohort_id", cohortId)
        .addValue("lesson_title", lessonTitle);

    return namedJdbc.query(sql, p, (rs, rowNum) -> {
      ParticipantProgressRowDto d = new ParticipantProgressRowDto();

      d.participant_id = longOrNull(rs, "participant_id");
      d.participant_code = rs.getString("participant_code");
      d.cohort_id = longOrNull(rs, "cohort_id");
      d.age_band = rs.getString("age_band");
      d.employment_status_at_entry = rs.getString("employment_status_at_entry");
      d.education_level_at_entry = rs.getString("education_level_at_entry");
      d.referral_source = rs.getString("referral_source");
      d.completion_status = rs.getString("completion_status");
      d.enrollment_date = String.valueOf(rs.getObject("enrollment_date"));

      d.attendance_id = longOrNull(rs, "attendance_id");
      d.session_id = longOrNull(rs, "session_id");
      d.attendance_status = rs.getString("attendance_status");
      d.participation_level = rs.getString("participation_level");
      d.left_early = boolOrNull(rs, "left_early");
      d.behaviour_notes = rs.getString("behaviour_notes");

      d.lesson_plan_id = longOrNull(rs, "lesson_plan_id");
      d.lesson_title = rs.getString("lesson_title");
      d.cohort_code = rs.getString("cohort_code");

      d.progress_id = longOrNull(rs, "progress_id");
      d.week_number = intOrNull(rs, "week_number");
      d.progress_date = String.valueOf(rs.getObject("progress_date"));
      d.attendance_rate_pct = dblOrNull(rs, "attendance_rate_pct");
      d.engagement_score = dblOrNull(rs, "engagement_score");
      d.confidence_score = dblOrNull(rs, "confidence_score");
      d.motivation_score = dblOrNull(rs, "motivation_score");
      d.skills_progress_score = dblOrNull(rs, "skills_progress_score");
      d.overall_progress = rs.getString("overall_progress");
      d.barriers_identified = rs.getString("barriers_identified");
      d.support_provided = rs.getString("support_provided");
      d.recorded_by_staff_id = longOrNull(rs, "recorded_by_staff_id");

      d.staff_id = longOrNull(rs, "staff_id");
      d.staff_code = rs.getString("staff_code");
      d.city_id = longOrNull(rs, "city_id");

      d.achievement_id = longOrNull(rs, "achievement_id");
      d.skill_id = longOrNull(rs, "skill_id");
      d.initial_proficiency = intOrNull(rs, "initial_proficiency");
      d.current_proficiency = intOrNull(rs, "current_proficiency");
      d.target_proficiency = intOrNull(rs, "target_proficiency");
      d.first_assessed_date = String.valueOf(rs.getObject("first_assessed_date"));
      d.achievement_status = rs.getString("achievement_status");
      d.last_assessed_date = String.valueOf(rs.getObject("last_assessed_date"));
      d.verified_by_staff_id = longOrNull(rs, "verified_by_staff_id");

      d.skill_name = rs.getString("skill_name");
      d.skill_category_id = longOrNull(rs, "skill_category_id");
      d.category_name = rs.getString("category_name");
      d.category_code = rs.getString("category_code");
      d.skill_category_description = rs.getString("skill_category_description");

      return d;
    });
  }
}
