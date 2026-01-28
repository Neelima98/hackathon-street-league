package com.streetleague.backend.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.streetleague.backend.model.CalendarView;

@Repository
@Profile("databricks")
public class DatabricksCalendarViewRepository {

  private final JdbcTemplate jdbc;

  @Value("${databricks.table.session}")
  private String sessionTable;

  @Value("${databricks.table.cohort}")
  private String cohortTable;

  public DatabricksCalendarViewRepository(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public List<CalendarView> getCalendarView(int staffId) {

    String sql = """
        SELECT
          s.staff_id,
          s.staff_code,
          s.city_id,

          ss.session_id,
          ss.cohort_id,
          ss.lead_staff_id,
          ss.support_staff_id,
          ss.start_time,
          ss.actual_duration_minutes,
          ss.session_type,
          ss.session_date,
          ss.lesson_plan_id,

          lp.lesson_title,

          city.city_name,

          c.cohort_code,
          c.day_of_week,
          c.session_time,

          CASE
            WHEN ss.lead_staff_id = ss.support_staff_id
                 AND ss.support_staff_id = s.staff_id
              THEN 'Lead and Support'
            WHEN ss.lead_staff_id = s.staff_id
              THEN 'Lead'
            WHEN ss.support_staff_id = s.staff_id
              THEN 'Support'
            ELSE NULL
          END AS staff_role_in_session

        FROM hackathon.emea.staff s
        JOIN hackathon.emea.session ss
          ON (s.staff_id = ss.lead_staff_id OR s.staff_id = ss.support_staff_id)
        JOIN hackathon.emea.lesson_plan lp
          ON ss.lesson_plan_id = lp.lesson_plan_id
        JOIN hackathon.emea.city city
          ON s.city_id = city.city_id
        JOIN hackathon.emea.cohort c
          ON ss.cohort_id = c.cohort_id

        WHERE s.staff_id = ?

        ORDER BY ss.session_date, ss.start_time
    """;

    return jdbc.query(sql, (rs, rowNum) -> {
        CalendarView dto = new CalendarView();

        dto.staff_id = rs.getInt("staff_id");
        dto.staff_code = rs.getString("staff_code");
        dto.city_id = rs.getInt("city_id");
        dto.city_name = rs.getString("city_name");

        dto.session_id = rs.getInt("session_id");
        dto.cohort_id = rs.getInt("cohort_id");
        dto.lesson_plan_id = rs.getInt("lesson_plan_id");
        dto.lead_staff_id = rs.getInt("lead_staff_id");
        dto.support_staff_id = rs.getInt("support_staff_id");
        dto.start_time = String.valueOf(rs.getObject("start_time"));
        dto.actual_duration_minutes = rs.getInt("actual_duration_minutes");
        dto.session_type = rs.getString("session_type");
        dto.session_date = String.valueOf(rs.getObject("session_date"));

        dto.lesson_title = rs.getString("lesson_title");

        dto.cohort_code = rs.getString("cohort_code");
        dto.day_of_week = rs.getString("day_of_week");
        dto.session_time = rs.getString("session_time");

        dto.staff_role_in_session = rs.getString("staff_role_in_session");

        return dto;
    }, staffId);
}


}