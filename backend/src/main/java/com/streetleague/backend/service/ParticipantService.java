package com.streetleague.backend.service;

import com.streetleague.backend.model.Participant;
import com.streetleague.backend.repo.ParticipantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParticipantService {
    private final ParticipantRepository repo;

    public ParticipantService(ParticipantRepository repo) {
        this.repo = repo;
    }

    public List<Participant> getParticipants(int minRisk) {
        return repo.findAll(minRisk);
    }

    public Participant getParticipant(String id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Participant not found"));
    }
}
