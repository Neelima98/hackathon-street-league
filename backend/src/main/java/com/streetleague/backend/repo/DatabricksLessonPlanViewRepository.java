package com.streetleague.backend.repo;

import java.util.List;

import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.streetleague.backend.model.LessonPlanView;

@Repository
@Profile("databricks")
public class DatabricksLessonPlanViewRepository {

    private final JdbcTemplate jdbc;

    public DatabricksLessonPlanViewRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<LessonPlanView> getLessonPlans() {

        String sql = """
            SELECT
              lp.lesson_plan_id,
              lp.lesson_code,
              lp.lesson_title,
              lp.theme_id,
              lp.product_type_id,
              lp.difficulty_level,
              lp.duration_minutes,
              lp.delivery_method,
              lp.requires_equipment,
              lp.max_participants,

              pt.product_type_name,
              pt.product_code,
              pt.duration_weeks,

              wt.theme_name,
              wt.theme_code,
              wt.category,
              wt.description

            FROM hackathon.emea.lesson_plan lp
            JOIN hackathon.emea.product_type pt
              ON lp.product_type_id = pt.product_type_id
            JOIN hackathon.emea.workshop_theme wt
              ON wt.theme_id = lp.theme_id

            WHERE lp.is_active = true
              AND pt.is_active = true
              AND wt.is_active = true
        """;

        return jdbc.query(sql, (rs, rowNum) -> {
            LessonPlanView dto = new LessonPlanView();

            dto.lesson_plan_id = rs.getInt("lesson_plan_id");
            dto.lesson_code = rs.getString("lesson_code");
            dto.lesson_title = rs.getString("lesson_title");
            dto.theme_id = rs.getInt("theme_id");
            dto.product_type_id = rs.getInt("product_type_id");
            dto.difficulty_level = rs.getString("difficulty_level");
            dto.duration_minutes = (Integer) rs.getObject("duration_minutes");
            dto.delivery_method = rs.getString("delivery_method");
            dto.requires_equipment = (Boolean) rs.getObject("requires_equipment");
            dto.max_participants = (Integer) rs.getObject("max_participants");

            dto.product_type_name = rs.getString("product_type_name");
            dto.product_code = rs.getString("product_code");
            dto.duration_weeks = (Integer) rs.getObject("duration_weeks");

            dto.theme_name = rs.getString("theme_name");
            dto.theme_code = rs.getString("theme_code");
            dto.category = rs.getString("category");
            dto.description = rs.getString("description");

            return dto;
        });
    }
}
