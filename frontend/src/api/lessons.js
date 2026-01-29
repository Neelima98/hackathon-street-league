const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getLessonPlans = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/lesson-plans`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch lesson plans:', error);
        throw error;
    }
};