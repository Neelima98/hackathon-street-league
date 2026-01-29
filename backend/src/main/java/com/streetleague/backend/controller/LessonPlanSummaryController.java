package com.streetleague.backend.controller;

import com.streetleague.backend.model.LessonPlanSummaryDto;
import com.streetleague.backend.repo.DatabricksLessonPlanSummaryRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Profile("databricks")
public class LessonPlanSummaryController {

  private final DatabricksLessonPlanSummaryRepository repo;

  public LessonPlanSummaryController(DatabricksLessonPlanSummaryRepository repo) {
    this.repo = repo;
  }

  // /api/lesson-plans/summary?difficulty_level=Beginner&delivery_method=Online
  @GetMapping("/lesson-plans/summary")
  public List<LessonPlanSummaryDto> summary(
      @RequestParam(required = false) String difficulty_level,
      @RequestParam(required = false) String delivery_method
  ) {
    return repo.search(difficulty_level, delivery_method);
  }
}
