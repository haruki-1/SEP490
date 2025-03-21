import api from '@/utils/api';

export const addHomeStayFacility = async (facilityData) => {
	try {
		const response = await api.post('/HomeStay/add-home-stay-facility', facilityData);
		return response.data;
	} catch (error) {
		console.error('Error adding home stay facility:', error);
		throw error;
	}
};
