import api from "@/utils/api";

export const confirmBooking = async (bookingId) => {
	try {
		const response = await api.get(`/Booking/confirm?bookingId=${bookingId}`);
		return response.data;
	} catch (error) {
		console.error('Error confirming booking:', error);
		throw error;
	}
};
