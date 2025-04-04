import api from "@/utils/api";

export const editPost = async (postData) => {
	try {
		const response = await api.put(`/Post/edit/${postData.id}`, postData);
		return response.data;
	} catch (error) {
		console.error('Error editing home stay information:', error);
		throw error;
	}
};
