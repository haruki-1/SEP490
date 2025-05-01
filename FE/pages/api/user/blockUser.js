import api from "utils/api";

export const blockUser = async (id) => {
	try {
		const response = await api.put(`/Auth/block?id=${id}`);
		return response.data;
	} catch (error) {
		console.error('Error blocking user:', error);
		throw error;
	}
};
