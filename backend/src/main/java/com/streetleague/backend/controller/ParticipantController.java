package com.streetleague.backend.controller;

import com.streetleague.backend.model.Participant;
import com.streetleague.backend.service.ParticipantService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ParticipantController {

    private final ParticipantService service;

    public ParticipantController(ParticipantService service) {
        this.service = service;
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    @GetMapping("/participants")
    public List<Participant> participants(@RequestParam(defaultValue = "0") int minRisk) {
        return service.getParticipants(minRisk);
    }

    @GetMapping("/participants/{id}")
    public Participant participant(@PathVariable String id) {
        return service.getParticipant(id);
    }
}
