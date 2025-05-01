import api from 'utils/api';

export const searchHomeStayByCity = async (city) => {
	try {
		const response = await api.get(`/HomeStay/search-by-city?city=${encodeURIComponent(city)}`);
		return response.data;
	} catch (error) {
		console.error('Error searching homestays by city:', error);
		throw error;
	}
};
