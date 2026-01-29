package com.streetleague.backend.repo;

import com.streetleague.backend.model.LessonPlanSummaryDto;
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
public class DatabricksLessonPlanSummaryRepository {

  private final NamedParameterJdbcTemplate namedJdbc;

  public DatabricksLessonPlanSummaryRepository(NamedParameterJdbcTemplate namedJdbc) {
    this.namedJdbc = namedJdbc;
  }

  private Integer intOrNull(ResultSet rs, String col) throws SQLException {
    BigDecimal bd = rs.getBigDecimal(col); // Databricks JDBC often returns BigDecimal
    return bd == null ? null : bd.intValue();
  }

  private Boolean boolOrNull(ResultSet rs, String col) throws SQLException {
    Object o = rs.getObject(col);
    if (o == null) return null;
    if (o instanceof Boolean b) return b;
    if (o instanceof BigDecimal bd) return bd.intValue() != 0;
    if (o instanceof Number n) return n.intValue() != 0;
    return Boolean.parseBoolean(o.toString());
  }

  public List<LessonPlanSummaryDto> search(String difficultyLevel, String deliveryMethod) {

    String sql = """
      SELECT
        lp.lesson_plan_id,
        lp.lesson_code,
        lp.lesson_title,
        lp.theme_id,
        lp.product_type_id,
        lp.difficulty_level,
        lp.delivery_method,
        lp.duration_minutes,
        lp.max_participants,
        lp.requires_equipment,

        pt.product_type_name,
        pt.duration_weeks,

        wt.theme_name,
        wt.theme_code,
        wt.category AS theme_category,
        wt.description AS theme_description,

        COALESCE(concat_ws(', ', collect_set(s.skill_name)), '') AS skills,
        size(collect_set(s.skill_name)) AS skill_count

      FROM hackathon.emea.lesson_plan lp

      LEFT JOIN hackathon.emea.product_type pt
        ON lp.product_type_id = pt.product_type_id AND pt.is_active = TRUE

      LEFT JOIN hackathon.emea.workshop_theme wt
        ON wt.theme_id = lp.theme_id AND wt.is_active = TRUE

      LEFT JOIN hackathon.emea.bridge_lesson_skill bls
        ON lp.lesson_plan_id = bls.lesson_plan_id AND bls.is_active = TRUE

      LEFT JOIN hackathon.emea.skill s
        ON bls.skill_id = s.skill_id AND s.is_active = TRUE

      WHERE lp.is_active = TRUE
        AND (:difficulty_level IS NULL OR TRIM(:difficulty_level) = '' OR lp.difficulty_level = :difficulty_level)
        AND (:delivery_method IS NULL OR TRIM(:delivery_method) = '' OR lp.delivery_method = :delivery_method)

      GROUP BY
        lp.lesson_plan_id,
        lp.lesson_code,
        lp.lesson_title,
        lp.theme_id,
        lp.product_type_id,
        lp.difficulty_level,
        lp.delivery_method,
        lp.duration_minutes,
        lp.max_participants,
        lp.requires_equipment,
        pt.product_type_name,
        pt.duration_weeks,
        wt.theme_name,
        wt.theme_code,
        wt.category,
        wt.description

      ORDER BY lp.lesson_title
      """;

    MapSqlParameterSource p = new MapSqlParameterSource()
        .addValue("difficulty_level", difficultyLevel)
        .addValue("delivery_method", deliveryMethod);

    return namedJdbc.query(sql, p, (rs, rowNum) -> {
      LessonPlanSummaryDto d = new LessonPlanSummaryDto();

      d.lesson_plan_id = intOrNull(rs, "lesson_plan_id");
      d.lesson_code = rs.getString("lesson_code");
      d.lesson_title = rs.getString("lesson_title");
      d.theme_id = intOrNull(rs, "theme_id");
      d.product_type_id = intOrNull(rs, "product_type_id");
      d.difficulty_level = rs.getString("difficulty_level");
      d.delivery_method = rs.getString("delivery_method");
      d.duration_minutes = intOrNull(rs, "duration_minutes");
      d.max_participants = intOrNull(rs, "max_participants");
      d.requires_equipment = boolOrNull(rs, "requires_equipment");

      d.product_type_name = rs.getString("product_type_name");
      d.duration_weeks = intOrNull(rs, "duration_weeks");

      d.theme_name = rs.getString("theme_name");
      d.theme_code = rs.getString("theme_code");
      d.theme_category = rs.getString("theme_category");
      d.theme_description = rs.getString("theme_description");

      d.skills = rs.getString("skills");
      d.skill_count = intOrNull(rs, "skill_count");

      return d;
    });
  }
}
