import api from '@/utils/api';

export const getPaymentReturn = async (code, id, cancel, status, orderCode) => {
	try {
		const params = new URLSearchParams();
		if (code) params.append('code', code);
		if (id) params.append('id', id);
		if (cancel) params.append('cancel', cancel);
		if (status) params.append('status', status);
		if (orderCode) params.append('orderCode', orderCode);

		const queryString = params.toString();
		const response = await api.get(`/Payment/payment-return${queryString ? `?${queryString}` : ''}`);
		return response.data;
	} catch (error) {
		console.error('Error processing payment return:', error);
		throw error;
	}
};
