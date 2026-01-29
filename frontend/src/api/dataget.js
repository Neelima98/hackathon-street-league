// Base URL for API endpoints
const API_BASE_URL = "http://localhost:8080/api";

// Dummy GET requests for outcomes and progress endpoints
// Replace the URLs with real endpoints when available

export async function fetchOutcomes() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/participants/outcomes/?participant_id=123&cohort_id=10&outcome_name=Employment`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch outcomes: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function fetchProgress() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/progress/participant_id=123&cohort_id=10&lesson_title=Intro%20Session`,
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch progress: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
