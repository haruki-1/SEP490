import api from "utils/api";

export const createFeedback = async (homestayID, rating, description) => {
	try {
		const response = await api.post('/Feedback', {
			homestayID,
			rating,
			description,
		});
		return response.data;
	} catch (error) {
		console.error('Error creating feedback:', error);
		throw error;
	}
};