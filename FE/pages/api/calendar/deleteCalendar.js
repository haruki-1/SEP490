<<<<<<< Updated upstream
import api from '@/utils/api';
=======
import api from "@/utils/api";
>>>>>>> Stashed changes

export const deleteCalendarEntry = async (calendarId) => {
	try {
		const response = await api.delete(`/Calendar/${calendarId}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting calendar entry:', error);
		throw error;
	}
};
