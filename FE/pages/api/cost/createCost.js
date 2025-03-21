import api from "@/utils/api";

export const createCost = async (costdata) => {
	try {
		const response = await api.post('/Cost/add-cost', [costdata]);
		return response.data;
	} catch (error) {
		console.error('Error adding facility:', error);
		throw error;
	}
};