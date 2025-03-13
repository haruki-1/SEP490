import api from "@/utils/api";

export const getAllCosts = async () => {
	try {
		const response = await api.get('/Cost/get-all');
		return response.data;
	} catch (error) {
		console.error('Error fetching home stays:', error);
		throw error;
	}
};