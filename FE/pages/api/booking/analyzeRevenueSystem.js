import api from "utils/api";

export const analyzeRevenueSystem = async () => {
	try {
		const response = await api.get('/Booking/analyze-revenue-system-home-stay');
		return response.data;
	} catch (error) {
		console.error('Error analyzing system revenue:', error);
		throw error;
	}
};
