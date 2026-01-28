package com.streetleague.backend.controller;

import com.streetleague.backend.model.LessonPlanView;
import com.streetleague.backend.repo.DatabricksLessonPlanViewRepository;

import java.util.List;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Profile("databricks")
public class LessonPlanViewController {

    private final DatabricksLessonPlanViewRepository repo;

    public LessonPlanViewController(DatabricksLessonPlanViewRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/lesson-plans")
    public List<LessonPlanView> search(
      @RequestParam(required = false) String difficulty_level,
      @RequestParam(required = false) String skill_name,
      @RequestParam(required = false) String delivery_method
  ) {
    return repo.getLessonPlans(difficulty_level, skill_name, delivery_method);
  }
}
