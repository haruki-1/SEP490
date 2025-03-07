<<<<<<< Updated upstream
import api from "@/utils/api";
=======
import api from '@/utils/api';
>>>>>>> Stashed changes

export const getCityList = async () => {
	try {
		const response = await api.get('/HomeStay/get-city-list');
		return response.data;
	} catch (error) {
		console.error('Error fetching city list:', error);
		throw error;
	}
};
