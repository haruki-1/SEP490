import api from "utils/api";

export const updateCalendarEntry = async (calendarId, calendarData) => {
	try {
		const response = await api.put(`/Calendar/${calendarId}`, calendarData);
		return response.data;
	} catch (error) {
		console.error('Error updating calendar entry:', error);
		throw error;
	}
};
