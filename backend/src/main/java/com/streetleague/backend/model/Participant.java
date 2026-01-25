package com.streetleague.backend.model;

import java.util.List;

public class Participant {
    private String participantId;
    private String name;
    private int riskScore;
    private List<String> reasons;
    private String recommendedAction;

    public Participant() {}

    public String getParticipantId() { return participantId; }
    public void setParticipantId(String participantId) { this.participantId = participantId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }

    public List<String> getReasons() { return reasons; }
    public void setReasons(List<String> reasons) { this.reasons = reasons; }

    public String getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(String recommendedAction) { this.recommendedAction = recommendedAction; }
}
