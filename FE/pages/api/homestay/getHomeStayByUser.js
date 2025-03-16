import api from '@/utils/api';

export const getHomeStayByUser = async (id) => {
	try {
		const response = await api.get(`/HomeStay/get-home-stay-by-user?userID=${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching homestay user:', error);
		throw error;
	}
};