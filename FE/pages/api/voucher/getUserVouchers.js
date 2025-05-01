import api from "utils/api";

export const getUserVouchers = async () => {
	try {
		const response = await api.get('/Voucher/user-vouchers');
		return response.data;
	} catch (error) {
		console.error('Error fetching user vouchers:', error);
		throw error;
	}
};
