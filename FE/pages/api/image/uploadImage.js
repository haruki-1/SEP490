import api from "@/utils/api";


export const uploadImage = async (file) => {
	const formData = new FormData();
	formData.append('file', file);

	const response = await api.post('/Upload/upload-image', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	return response.data;
};