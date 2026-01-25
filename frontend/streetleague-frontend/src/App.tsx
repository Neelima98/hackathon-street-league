import { useEffect, useState } from "react";

type Participant = {
  participantId: string;
  name: string;
  riskScore: number;
  reasons: string[];
  recommendedAction: string;
};

const API_BASE = "http://localhost:8080/api";

export default function App() {
  const [minRisk, setMinRisk] = useState(50);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selected, setSelected] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadParticipants() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/participants?minRisk=${minRisk}`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = (await res.json()) as Participant[];
      setParticipants(data);
      setSelected(data.length ? data[0] : null);
    } catch (e: any) {
      setError(e.message || "Failed to load participants");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minRisk]);

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, Arial" }}>
      <h1>Early Support Radar (Prototype)</h1>
      <p style={{ marginTop: -10, color: "#555" }}>
        React (UI) → Java API → Mock JSON (swap to Databricks later)
      </p>

      <div style={{ margin: "12px 0" }}>
        <label>
          Minimum risk: <b>{minRisk}</b>
        </label>
        <input
          type="range"
          min={0}
          max={100}
          value={minRisk}
          onChange={(e) => setMinRisk(Number(e.target.value))}
          style={{ width: 400, marginLeft: 12 }}
        />
        <button onClick={loadParticipants} style={{ marginLeft: 12 }}>
          Refresh
        </button>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* List */}
        <div style={{ width: "45%" }}>
          <h2>Priority List</h2>
          {participants.length === 0 ? (
            <p>No participants match this filter.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Name</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Risk</th>
                  <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => (
                  <tr
                    key={p.participantId}
                    onClick={() => setSelected(p)}
                    style={{
                      cursor: "pointer",
                      background: selected?.participantId === p.participantId ? "#eef6ff" : "transparent",
                    }}
                  >
                    <td style={{ padding: "8px 4px" }}>{p.name}</td>
                    <td style={{ padding: "8px 4px" }}>{p.riskScore}</td>
                    <td style={{ padding: "8px 4px" }}>{p.recommendedAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail */}
        <div style={{ width: "55%", border: "1px solid #ddd", padding: 14, borderRadius: 8 }}>
          <h2>Participant Detail</h2>
          {!selected ? (
            <p>Select a participant</p>
          ) : (
            <>
              <h3 style={{ marginBottom: 0 }}>{selected.name}</h3>
              <p style={{ marginTop: 6 }}>
                <b>Risk score:</b> {selected.riskScore}
              </p>

              <h4>Why flagged</h4>
              <ul>
                {selected.reasons.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>

              <h4>Recommended action</h4>
              <div style={{ padding: 10, background: "#f5fff5", border: "1px solid #cdeccd" }}>
                {selected.recommendedAction}
              </div>

              <h4 style={{ marginTop: 14 }}>Copilot placeholder</h4>
              <p style={{ color: "#555" }}>
                Hackathon day: show “Draft outreach message” + “Next 7-day plan”.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
