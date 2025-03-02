import api from 'utils/api';

export const deletePost = async (id) => {
	try {
		const response = await api.delete(`/Post/delete/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting post:', error);
		throw error;
	}
};
