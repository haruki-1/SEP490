import api from "utils/api";

export const getUserById = async (id) => {
	try {
		const response = await api.get(`/User/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching user:', error);
		throw error;
	}
};
