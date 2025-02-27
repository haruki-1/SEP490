import api from 'utils/api';

export const getPostDetail = async (id) => {
	try {
		const response = await api.get(`/Post/detail/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching home stay detail:', error);
		throw error;
	}
};
