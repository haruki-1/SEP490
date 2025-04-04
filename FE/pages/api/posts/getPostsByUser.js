import api from "@/utils/api";

export const getPostsByUser = async () => {
	try {
		const response = await api.get('/Post/get-post-by-user');
		return response.data;
	} catch (error) {
		console.error('Error fetching user posts:', error);
		throw error;
	}
};
