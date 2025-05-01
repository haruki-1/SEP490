import api from "utils/api";

export const cancelBooking = async (bookingID, reasonCancel) => {
	try {
		const response = await api.post('/Booking/cancel', {
			bookingID,
			reasonCancel,
		});
		return response.data;
	} catch (error) {
		console.error('Error canceling booking:', error);
		throw error;
	}
};