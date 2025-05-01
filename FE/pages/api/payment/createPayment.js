import api from "utils/api";

export const createPayment = async (bookingID) => {
	try {
		const response = await api.post(`/Payment?bookingID=${bookingID}`);
		return response.data;
	} catch (error) {
		console.error('Error creating payment:', error);
		throw error;
	}
};
