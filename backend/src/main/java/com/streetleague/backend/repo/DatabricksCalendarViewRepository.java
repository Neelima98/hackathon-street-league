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
  String staffTable = "hackathon.emea.staff";  // or make this a @Value too
  String sql = """
    SELECT
      st.staff_id,
      st.staff_code,

      sess.session_id,
      sess.cohort_id,
      sess.lead_staff_id,
      sess.support_staff_id,
      sess.start_time,
      sess.actual_duration_minutes,
      sess.session_type,
      sess.session_date,

      CASE
        WHEN sess.lead_staff_id = st.staff_id AND sess.support_staff_id = st.staff_id THEN 'Lead and Support'
        WHEN sess.lead_staff_id = st.staff_id THEN 'Lead'
        WHEN sess.support_staff_id = st.staff_id THEN 'Support'
        ELSE NULL
      END AS staff_role_in_session

    FROM %s st
    JOIN %s sess
      ON (sess.lead_staff_id = st.staff_id OR sess.support_staff_id = st.staff_id)

    WHERE st.staff_id = ?
      AND st.is_active = true
      AND sess.is_active = true

    ORDER BY sess.session_date, sess.start_time
  """.formatted(staffTable, sessionTable);

  return jdbc.query(sql, (rs, rowNum) -> {
    CalendarView v = new CalendarView();
    v.staff_id = rs.getInt("staff_id");
    v.staff_code = rs.getString("staff_code");

    v.session_id = rs.getInt("session_id");
    v.cohort_id = rs.getInt("cohort_id");
    v.lead_staff_id = rs.getInt("lead_staff_id");
    v.support_staff_id = rs.getInt("support_staff_id");
    v.start_time = String.valueOf(rs.getObject("start_time"));
    v.actual_duration_minutes = rs.getInt("actual_duration_minutes");
    v.session_type = rs.getString("session_type");
    v.session_date = String.valueOf(rs.getObject("session_date"));

    v.staff_role_in_session = rs.getString("staff_role_in_session");
    return v;
  }, staffId);
}

}
