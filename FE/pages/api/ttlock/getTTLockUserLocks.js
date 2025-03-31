import api from '@/utils/api';

export const getTTLockUserLocks = async (homeStayID) => {
	try {
		const response = await api.post(`/ttlock/user-locks?homeStayID=${homeStayID}`);
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch TTLock user locks');
	}
};