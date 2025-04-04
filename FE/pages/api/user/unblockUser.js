import api from "@/utils/api";

export const unblockUser = async (id) => {
	try {
		const response = await api.put(`/Auth/unblock?id=${id}`);
		return response.data;
	} catch (error) {
		console.error('Error unblocking user:', error);
		throw error;
	}
};
