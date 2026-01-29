package com.streetleague.backend.controller;

import com.streetleague.backend.model.ParticipantOutcomeRowDto;
import com.streetleague.backend.repo.DatabricksParticipantOutcomeRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Profile("databricks")
public class ParticipantOutcomeController {

  private final DatabricksParticipantOutcomeRepository repo;

  public ParticipantOutcomeController(DatabricksParticipantOutcomeRepository repo) {
    this.repo = repo;
  }

  // Example:
  // /api/participants/outcomes?participant_id=123&cohort_id=10&outcome_name=Employment
  @GetMapping("/participants/outcomes")
  public List<ParticipantOutcomeRowDto> search(
      @RequestParam(required = false) String participant_id,
      @RequestParam(required = false) String cohort_id,
      @RequestParam(required = false) String outcome_name
  ) {
    return repo.search(participant_id, cohort_id, outcome_name);
  }
}
