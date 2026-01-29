package com.streetleague.backend.controller;

import com.streetleague.backend.model.ParticipantProgressRowDto;
import com.streetleague.backend.repo.DatabricksParticipantProgressRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Profile("databricks")
public class ParticipantProgressController {

  private final DatabricksParticipantProgressRepository repo;

  public ParticipantProgressController(DatabricksParticipantProgressRepository repo) {
    this.repo = repo;
  }

  // Example:
  // /api/participants/progress?participant_id=123&cohort_id=10&lesson_title=Intro%20Session
  @GetMapping("/participants/progress")
  public List<ParticipantProgressRowDto> search(
      @RequestParam(required = false) String participant_id,
      @RequestParam(required = false) String cohort_id,
      @RequestParam(required = false) String lesson_title
  ) {
    return repo.search(participant_id, cohort_id, lesson_title);
  }
}
