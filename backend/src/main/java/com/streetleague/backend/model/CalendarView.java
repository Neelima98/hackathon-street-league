package com.streetleague.backend.model;

public class CalendarView {
  // staff
    public Integer staff_id;
    public String staff_code;
    public Integer city_id;
    public String city_name;

    // session
    public Integer session_id;
    public Integer cohort_id;
    public Integer lesson_plan_id;
    public Integer lead_staff_id;
    public Integer support_staff_id;
    public String start_time;
    public Integer actual_duration_minutes;
    public String session_type;
    public String session_date;

    // lesson plan
    public String lesson_title;

    // cohort
    public String cohort_code;
    public String day_of_week;
    public String session_time;

    // derived
    public String staff_role_in_session;
}