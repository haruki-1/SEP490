export const createBooking = async (userId, bookingData) => {
	const url = 'https://duongcongson-001-site1.jtempurl.com/api/Booking/create';

	try {
		// Ensure proper format of payload based on Postman example
		const formattedData = {
			calenders: bookingData.calenders.map((cal) => ({
				calenderID: cal.calenderID,
			})),
			voucherCode: bookingData.voucherCode || null,
			isOnline: bookingData.isOnline,
			checkInDate: bookingData.checkInDate, 
			checkOutDate: bookingData.checkOutDate, 
		};


		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				'X-User-Id': userId,
			},
			body: JSON.stringify(formattedData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to create booking');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error creating booking:', error);
		throw error;
	}
};