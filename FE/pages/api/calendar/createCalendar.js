import api from "@/utils/api";

export const createCalendar = async (calendarData) => {
	try {
		const response = await api.post('/Calendar/create', calendarData);
		return response.data;
	} catch (error) {
		console.error('Error creating calendar entries:', error);
		throw error;
	}
};
