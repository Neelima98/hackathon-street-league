package com.streetleague.backend.controller;

import com.streetleague.backend.model.CohortCodeDTO;
import com.streetleague.backend.repo.CohortCodeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CohortCodeController {

    private final CohortCodeRepository repository;

    public CohortCodeController(CohortCodeRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/cohort-codes")
    public List<CohortCodeDTO> getCohortCodes() {
        return repository.getCohortCodes();
    }
}
