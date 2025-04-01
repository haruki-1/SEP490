import api from '@/utils/api';

export const replyFeedbackByUserEmail = async (replyData) => {
	try {
		const response = await api.post(`/Feedback/reply-feedback-by-user-email`, replyData);
		return response.data;
	} catch (error) {
		console.error('Error replying to feedback:', error);
		throw error;
	}
};