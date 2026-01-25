package com.streetleague.backend.repo;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Repository;
import com.streetleague.backend.model.Participant;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@Profile("mock")
public class MockJsonParticipantRepository implements ParticipantRepository {

    private final List<Participant> participants;

    public MockJsonParticipantRepository(ObjectMapper objectMapper) {
        try {
            InputStream is = new ClassPathResource("mock/participants.json").getInputStream();
            this.participants = objectMapper.readValue(is, new TypeReference<List<Participant>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to load mock participants.json", e);
        }
    }

    @Override
    public List<Participant> findAll(int minRisk) {
        return participants.stream()
                .filter(p -> p.getRiskScore() >= minRisk)
                .sorted((a, b) -> Integer.compare(b.getRiskScore(), a.getRiskScore()))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Participant> findById(String participantId) {
        return participants.stream()
                .filter(p -> p.getParticipantId().equals(participantId))
                .findFirst();
    }
}
