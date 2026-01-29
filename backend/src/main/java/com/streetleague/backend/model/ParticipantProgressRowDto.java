package com.streetleague.backend.model;

public class ParticipantProgressRowDto {

  // participant
  public Long participant_id;
  public String participant_code;
  public Long cohort_id;
  public String age_band;
  public String employment_status_at_entry;
  public String education_level_at_entry;
  public String referral_source;
  public String completion_status;
  public String enrollment_date;

  // attendance
  public Long attendance_id;
  public Long session_id;
  public String attendance_status;
  public String participation_level;
  public Boolean left_early;
  public String behaviour_notes;

  // session + lesson plan
  public Long lesson_plan_id;
  public String lesson_title;

  // cohort
  public String cohort_code;

  // progress
  public Long progress_id;
  public Integer week_number;
  public String progress_date;
  public Double attendance_rate_pct;
  public Double engagement_score;
  public Double confidence_score;
  public Double motivation_score;
  public Double skills_progress_score;
  public String overall_progress;
  public String barriers_identified;
  public String support_provided;
  public Long recorded_by_staff_id;

  // staff
  public Long staff_id;
  public String staff_code;
  public Long city_id;

  // skill achievement
  public Long achievement_id;
  public Long skill_id;
  public Integer initial_proficiency;
  public Integer current_proficiency;
  public Integer target_proficiency;
  public String first_assessed_date;
  public String achievement_status;
  public String last_assessed_date;
  public Long verified_by_staff_id;

  // skill + category
  public String skill_name;
  public Long skill_category_id;
  public String category_name;
  public String category_code;
  public String skill_category_description;
}
