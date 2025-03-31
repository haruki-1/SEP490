// In pages/api/ttlock/editTTLockAccount.js
import api from '@/utils/api';

export const editTTLockAccount = async (data) => {
	try {
		const formData = new FormData();
		// Ensure values are strings and append to FormData
		formData.append('TTLockUserName', String(data.TTLockUserName || ''));
		formData.append('Password', String(data.Password || ''));
		formData.append('HomeStayID', String(data.HomeStayID || ''));

		console.log('Sending FormData to API:', {
			TTLockUserName: String(data.TTLockUserName || ''),
			Password: String(data.Password || ''),
			HomeStayID: String(data.HomeStayID || ''),
		});

		// Use API with form-data headers

		const response = await api.put('/ttlock/edit-ttlock-account', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error) {
		console.error('Error in editTTLockAccount:', error);
		throw new Error('Failed to edit TTLock account');
	}
};