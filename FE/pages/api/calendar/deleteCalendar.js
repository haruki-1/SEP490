import api from 'utils/api';

export const deleteCalendarEntry = async (calendarId) => {
	try {
		const response = await api.delete(`/Calendar/${calendarId}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting calendar entry:', error);
		throw error;
	}
};
