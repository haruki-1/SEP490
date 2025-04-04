import api from 'utils/api';

export const searchHomeStay = async (city, checkInDate, checkOutDate) => {
	try {
		const response = await api.get('/HomeStay/search-home-stay', {
			params: {
				City: city,
				CheckInDate: checkInDate,
				CheckOutDate: checkOutDate,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error searching homestays:', error);
		throw error;
	}
};
