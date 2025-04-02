import api from "@/utils/api";

export const updateCost = async (costdata) => {
	try {
		const response = await api.put('/Cost/edit-cost', costdata);
		return response.data;
	} catch (error) {
		console.error('Error updating facility:', error);
		throw error;
	}
};