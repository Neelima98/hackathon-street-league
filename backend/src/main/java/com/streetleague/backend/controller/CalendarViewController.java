package com.streetleague.backend.controller;

import com.streetleague.backend.model.CalendarView;
import com.streetleague.backend.repo.DatabricksCalendarViewRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Profile("databricks")
public class CalendarViewController {

    private final DatabricksCalendarViewRepository repo;

  public CalendarViewController(DatabricksCalendarViewRepository repo) {
    this.repo = repo;
  }

  @GetMapping("/staff/{staffId}/sessions")
    public List<CalendarView> staffSessions(@PathVariable int staffId) {
        return repo.getCalendarView(staffId);
    }
}
