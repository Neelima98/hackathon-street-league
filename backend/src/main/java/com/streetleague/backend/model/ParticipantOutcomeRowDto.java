package com.streetleague.backend.model;

public class ParticipantOutcomeRowDto {

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

  // cohort
  public String cohort_code;

  // outcome
  public Long outcome_id;
  public Long outcome_type_id;
  public String outcome_date;
  public Integer weeks_from_program_end;
  public String sector;
  public Double hours_per_week;
  public String salary_band;
  public String employer_type;
  public Long recorded_by_staff_id;
  public Boolean is_sustained_13_weeks;
  public Boolean is_sustained_26_weeks;

  // outcome_type
  public Long ot_outcome_type_id;
  public String outcome_name;
  public String outcome_code;
  public String outcome_category;
  public String outcome_type_description;

  // staff
  public Long staff_id;
  public String staff_code;
}
