import api from 'utils/api';

export const exportBookings = async (homeStayID) => {
	try {
		const response = await api.get(`/Booking/export?homeStayID=${homeStayID}`, {
			responseType: 'blob',
		});

		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;

		const contentDisposition = response.headers['content-disposition'];
		let filename = 'bookings-export.xlsx';

		if (contentDisposition) {
			const filenameMatch = contentDisposition.match(/filename="(.+)"/);
			if (filenameMatch && filenameMatch.length === 2) {
				filename = filenameMatch[1];
			}
		}

		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		link.remove();

		return true;
	} catch (error) {
		console.error('Error exporting bookings:', error);
		throw error;
	}
};
