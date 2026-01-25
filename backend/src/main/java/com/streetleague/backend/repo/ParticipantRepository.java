package com.streetleague.backend.repo;

import com.streetleague.backend.model.Participant;

import java.util.List;
import java.util.Optional;

public interface ParticipantRepository {
    List<Participant> findAll(int minRisk);
    Optional<Participant> findById(String participantId);
}
