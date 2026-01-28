package com.streetleague.backend.model;

public class LessonPlanView {

   // lesson_plan
  public Integer lesson_plan_id;
  public String lesson_code;
  public String lesson_title;
  public Integer theme_id;
  public Integer product_type_id;
  public String difficulty_level;
  public String delivery_method;
  public Integer duration_minutes;
  public Integer max_participants;
  public Boolean requires_equipment;

  // session
  public Integer session_id;
  public Integer session_cohort_id;
  public Integer lead_staff_id;
  public Integer support_staff_id;
  public String start_time;
  public Integer actual_duration_minutes;
  public String session_type;
  public String session_date;

  // cohort
  public Integer cohort_id;
  public String cohort_code;
  public String day_of_week;
  public String session_time;

  // product_type
  public String product_type_name;
  public String product_code;
  public Integer duration_weeks;

  // workshop_theme
  public String theme_name;
  public String theme_code;
  public String theme_category;
  public String theme_description;

  // bridge_lesson_skill
  public Integer bridge_id;
  public Integer skill_id;
  public String skill_importance;
  public Integer learning_hours;
  public String target_proficiency_level;

  // skill
  public String skill_name;
  public Integer min_proficiency;
  public Integer skill_category_id;
  public Integer max_proficiency;

  // skill_category
  public String category_name;
  public String category_code;
  public String skill_category_description;
}
