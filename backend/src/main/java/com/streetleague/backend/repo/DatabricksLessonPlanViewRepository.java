package com.streetleague.backend.repo;

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

    public List<LessonPlanView> getLessonPlans(String difficultyLevel, String skillName, String deliveryMethod) { 

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

        ss.session_id,
        ss.cohort_id AS session_cohort_id,
        ss.lead_staff_id,
        ss.support_staff_id,
        ss.start_time,
        ss.actual_duration_minutes,
        ss.session_type,
        ss.session_date,

        c.cohort_id AS cohort_id,
        c.cohort_code,
        c.day_of_week,
        c.session_time,

        pt.product_type_name,
        pt.product_code,
        pt.duration_weeks,

        wt.theme_name,
        wt.theme_code,
        wt.category AS theme_category,
        wt.description AS theme_description,

        bls.bridge_id,
        bls.skill_id,
        bls.skill_importance,
        bls.learning_hours,
        bls.target_proficiency_level,

        s.skill_name,
        s.min_proficiency,
        s.skill_category_id,
        s.max_proficiency,

        sc.category_name,
        sc.category_code,
        sc.description AS skill_category_description

      FROM hackathon.emea.lesson_plan lp
      JOIN hackathon.emea.session ss
        ON lp.lesson_plan_id = ss.lesson_plan_id
      JOIN hackathon.emea.cohort c
        ON ss.cohort_id = c.cohort_id
      JOIN hackathon.emea.product_type pt
        ON lp.product_type_id = pt.product_type_id
      JOIN hackathon.emea.workshop_theme wt
        ON wt.theme_id = lp.theme_id
      JOIN hackathon.emea.bridge_lesson_skill bls
        ON lp.lesson_plan_id = bls.lesson_plan_id
      JOIN hackathon.emea.skill s
        ON bls.skill_id = s.skill_id
      JOIN hackathon.emea.skill_category sc
        ON s.skill_category_id = sc.skill_category_id

      WHERE lp.is_active = true
        AND pt.is_active = true
        AND wt.is_active = true
        AND bls.is_active = true
        AND s.is_active = true
        AND sc.is_active = true
        AND (:difficulty_level IS NULL OR :difficulty_level = '' OR lp.difficulty_level = :difficulty_level)
        AND (:skill_name IS NULL OR :skill_name = '' OR s.skill_name = :skill_name)
        AND (:delivery_method IS NULL OR :delivery_method = '' OR lp.delivery_method = :delivery_method)

      ORDER BY lp.lesson_plan_id, bls.skill_id
    """;

    MapSqlParameterSource p = new MapSqlParameterSource()
        .addValue("difficulty_level", difficultyLevel)
        .addValue("skill_name", skillName)
        .addValue("delivery_method", deliveryMethod);

    return namedJdbc.query(sql, p, (rs, rowNum) -> {
      LessonPlanView d = new LessonPlanView();

      d.lesson_plan_id = (Integer) rs.getObject("lesson_plan_id");
      d.lesson_code = rs.getString("lesson_code");
      d.lesson_title = rs.getString("lesson_title");
      d.theme_id = (Integer) rs.getObject("theme_id");
      d.product_type_id = (Integer) rs.getObject("product_type_id");
      d.difficulty_level = rs.getString("difficulty_level");
      d.delivery_method = rs.getString("delivery_method");
      d.duration_minutes = (Integer) rs.getObject("duration_minutes");
      d.max_participants = (Integer) rs.getObject("max_participants");
      d.requires_equipment = (Boolean) rs.getObject("requires_equipment");

      d.session_id = (Integer) rs.getObject("session_id");
      d.session_cohort_id = (Integer) rs.getObject("session_cohort_id");
      d.lead_staff_id = (Integer) rs.getObject("lead_staff_id");
      d.support_staff_id = (Integer) rs.getObject("support_staff_id");
      d.start_time = String.valueOf(rs.getObject("start_time"));
      d.actual_duration_minutes = (Integer) rs.getObject("actual_duration_minutes");
      d.session_type = rs.getString("session_type");
      d.session_date = String.valueOf(rs.getObject("session_date"));

      d.cohort_id = (Integer) rs.getObject("cohort_id");
      d.cohort_code = rs.getString("cohort_code");
      d.day_of_week = rs.getString("day_of_week");
      d.session_time = rs.getString("session_time");

      d.product_type_name = rs.getString("product_type_name");
      d.product_code = rs.getString("product_code");
      d.duration_weeks = (Integer) rs.getObject("duration_weeks");

      d.theme_name = rs.getString("theme_name");
      d.theme_code = rs.getString("theme_code");
      d.theme_category = rs.getString("theme_category");
      d.theme_description = rs.getString("theme_description");

      d.bridge_id = (Integer) rs.getObject("bridge_id");
      d.skill_id = (Integer) rs.getObject("skill_id");
      d.skill_importance = rs.getString("skill_importance");
      d.learning_hours = (Integer) rs.getObject("learning_hours");
      d.target_proficiency_level = rs.getString("target_proficiency_level");

      d.skill_name = rs.getString("skill_name");
      d.min_proficiency = (Integer) rs.getObject("min_proficiency");
      d.skill_category_id = (Integer) rs.getObject("skill_category_id");
      d.max_proficiency = (Integer) rs.getObject("max_proficiency");

      d.category_name = rs.getString("category_name");
      d.category_code = rs.getString("category_code");
      d.skill_category_description = rs.getString("skill_category_description");

      return d;
    });
  }
}
