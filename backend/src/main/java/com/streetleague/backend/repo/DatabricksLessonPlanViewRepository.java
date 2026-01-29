package com.streetleague.backend.repo;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.streetleague.backend.model.LessonPlanView;

@Repository
@Profile("databricks")
public class DatabricksLessonPlanViewRepository {

  private final NamedParameterJdbcTemplate namedJdbc;

  public DatabricksLessonPlanViewRepository(NamedParameterJdbcTemplate namedJdbc) {
    this.namedJdbc = namedJdbc;
  }

  private Integer intOrNull(ResultSet rs, String col) throws SQLException {
    BigDecimal bd = rs.getBigDecimal(col);
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

  public List<LessonPlanView> search(String difficultyLevel, String skillName, String deliveryMethod) {

    String sql = """ 
      -- (PASTE THE FIXED SQL FROM SECTION 1 HERE)
    """;

    MapSqlParameterSource p = new MapSqlParameterSource()
      .addValue("difficulty_level", difficultyLevel)
      .addValue("skill_name", skillName)
      .addValue("delivery_method", deliveryMethod);

    return namedJdbc.query(sql, p, (rs, rowNum) -> {
      LessonPlanView d = new LessonPlanView();

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

      d.cohort_id = intOrNull(rs, "cohort_id");
      d.cohort_code = rs.getString("cohort_code");
      d.day_of_week = rs.getString("day_of_week");
      d.session_time = rs.getString("session_time");

      d.product_type_name = rs.getString("product_type_name");
      d.duration_weeks = intOrNull(rs, "duration_weeks");

      d.theme_name = rs.getString("theme_name");
      d.theme_code = rs.getString("theme_code");
      d.theme_category = rs.getString("theme_category");
      d.theme_description = rs.getString("theme_description");

      d.skill_id = intOrNull(rs, "skill_id");
      d.skill_importance = rs.getString("skill_importance");
      d.learning_hours = intOrNull(rs, "learning_hours");
      d.target_proficiency_level = rs.getString("target_proficiency_level");

      d.skill_name = rs.getString("skill_name");
      d.min_proficiency = intOrNull(rs, "min_proficiency");
      d.skill_category_id = intOrNull(rs, "skill_category_id");
      d.max_proficiency = intOrNull(rs, "max_proficiency");

      d.category_name = rs.getString("category_name");
      d.skill_category_description = rs.getString("skill_category_description");

      return d;
    });
  }
}
