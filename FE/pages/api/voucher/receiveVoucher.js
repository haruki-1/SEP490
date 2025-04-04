import api from "@/utils/api";

export const receiveVoucher = async (receiveData) => {
	try {
		const response = await api.post('/Voucher/receive', receiveData);
		return response.data;
	} catch (error) {
		console.error('Error receiving voucher:', error);
		throw error;
	}
};
