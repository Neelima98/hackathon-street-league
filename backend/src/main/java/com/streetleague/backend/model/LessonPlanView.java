package com.streetleague.backend.model;

public class LessonPlanView {

    // lesson_plan
    public Integer lesson_plan_id;
    public String lesson_code;
    public String lesson_title;
    public Integer theme_id;
    public Integer product_type_id;
    public String difficulty_level;
    public Integer duration_minutes;
    public String delivery_method;
    public Boolean requires_equipment;
    public Integer max_participants;

    // product_type
    public String product_type_name;
    public String product_code;
    public Integer duration_weeks;

    // workshop_theme
    public String theme_name;
    public String theme_code;
    public String category;
    public String description;
}
