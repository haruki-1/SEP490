import api from "utils/api";

export const getBookingByHomeStay = async (homeStayID) => {
	try {
		const response = await api.get(`/Booking/get-booking-by-home-stay?homeStayID=${homeStayID}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching bookings by homestay:', error);
		throw error;
	}
};
