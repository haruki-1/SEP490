import api from 'utils/api';

export const getRefunds = async (homeStayName) => {
	try {
		const response = await api.get('/Refunds/get-refunds', {
			params: homeStayName ? { homeStayName } : {},
		});
		return response.data;
	} catch (error) {
		console.error('Error getting refunds:', error);
		throw error;
	}
};