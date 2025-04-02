import api from '@/utils/api';

export const getHomeStayByUser = async (userID) => {
	try {
		const response = await api.get(`/HomeStay/get-home-stay-by-user?userID=${userID}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching homestays by user:', error);
		throw error;
	}
};

