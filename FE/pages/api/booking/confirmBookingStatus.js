import api from "@/utils/api";

export const confirmBookingStatus = async (bookingID) => {
	try {
		const response = await api.put(`/Booking/confirm-booking-status?bookingID=${bookingID}`);
		return response.data;
	} catch (error) {
		console.error('Error confirming booking status:', error);
		throw error;
	}
};
