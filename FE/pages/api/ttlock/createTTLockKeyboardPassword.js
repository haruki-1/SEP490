import api from '@/utils/api';

export const createTTLockKeyboardPassword = async (homeStayID, lockID) => {
	try {
		const formData = new FormData();
		formData.append('homeStayID', homeStayID);
		formData.append('lockID', lockID);

		const response = await api.post('/ttlock/keyboard-passwords', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error) {
		throw new Error('Failed to create TTLock keyboard password');
	}
};