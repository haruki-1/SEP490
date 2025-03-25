import api from '@/utils/api';

export const getRefunds = async () => {
	try {
		const response = await api.get('/Refunds/get-refunds');
		return response.data;
	} catch (error) {
		console.error('Error fetching refunds:', error);
		throw error;
	}
};
