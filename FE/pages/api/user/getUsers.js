import api from "@/utils/api";

export const getUsers = async (pageNumber = 1, pageSize = 10) => {
	try {
		const response = await api.get('/User', {
			params: { pageNumber, pageSize },
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching users:', error);
		throw error;
	}
};
