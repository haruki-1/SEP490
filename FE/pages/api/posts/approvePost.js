import api from "@/utils/api";

export const approvePost = async (postID) => {
	try {
		const formData = new FormData();
		formData.append('postID', postID);

		const response = await api.put('/Post/approval-post', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error) {
		console.error('Error approving post:', error);
		throw error;
	}
};
