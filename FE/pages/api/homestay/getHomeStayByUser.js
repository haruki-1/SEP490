import api from 'utils/api';

export const getBookingHistory = async () => {
	try {
		const response = await api.get(`/Booking/history`);
		return response.data;
	} catch (error) {
		console.error('Error fetching homestay user:', error);
		throw error;
	}
};
