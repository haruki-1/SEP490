import api from "@/utils/api";

export const addTTLockAccount = async (ttLockAccountData) => {
	try {
		const response = await api.post('/ttlock/add-ttlock-account', ttLockAccountData);
		return response.data;
	} catch (error) {
		console.error('Error adding TTLock account:', error);
		throw error;
	}
};