import api from 'utils/api';

export const searchHomeStay = async (checkInDate, checkOutDate) => {
	try {
		const response = await api.get('/HomeStay/search-home-stay', {
			params: {
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
