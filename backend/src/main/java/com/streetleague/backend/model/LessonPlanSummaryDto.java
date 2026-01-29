package com.streetleague.backend.model;


public class LessonPlanSummaryDto {
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

  public String product_type_name;
  public Integer duration_weeks;

  public String theme_name;
  public String theme_code;
  public String theme_category;
  public String theme_description;

  public String skills;       // comma-separated
  public Integer skill_count; // count of unique skills
}

