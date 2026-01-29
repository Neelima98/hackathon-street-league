// src/api/calendar.js
export async function getStaffSessions(userId) {
  try {
    const response = await fetch(`http://localhost:8080/api/staff/${userId}/sessions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      // statusText can be empty with CORS; use both
      const msg = `HTTP ${response.status} ${response.statusText || ''}`.trim();
      return { success: false, error: msg };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err?.message || "Network error" };
  }
}