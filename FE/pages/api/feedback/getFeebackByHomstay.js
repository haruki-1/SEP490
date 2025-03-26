import api from '@/utils/api';

export const getFeedbackByHomeStay = async (homeStayID) => {
	try {
		const response = await api.get(`/Feedback/get-feedback-by-home-stay`, {
			params: { homeStayID },
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching feedback by home stay:', error);
		throw error;
	}
};