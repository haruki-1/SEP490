import api from "utils/api";

export const rejectPost = async (postID, reasonReject) => {
	try {
		const response = await api.put('/Post/reject-post', {
			postID,
			reasonReject,
		});
		return response.data;
	} catch (error) {
		console.error('Error rejecting post:', error);
		throw error;
	}
};
