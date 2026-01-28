package com.streetleague.backend.controller;

import com.streetleague.backend.repo.DatabricksDropdownRepository;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Profile("databricks")
public class DropdownController {

    private final DatabricksDropdownRepository repo;

    public DropdownController(DatabricksDropdownRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/dropdowns")
    public Map<String, List<String>> dropdowns() {
        return repo.getDropdowns();
    }
}
