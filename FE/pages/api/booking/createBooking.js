export const createBooking = async (userId, bookingData) => {
	const url = 'https://localhost:7194/api/Booking/create';

	try {
		// Ensure proper format of payload based on Postman example
		const formattedData = {
			calenders: bookingData.calenders.map((cal) => ({
				calenderID: cal.calenderID,
			})),
			voucherCode: bookingData.voucherCode || null,
			isOnline: bookingData.isOnline,
		};

		console.log('Sending booking data:', JSON.stringify(formattedData));

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
			const errorText = await response.text();
			console.error('Server error response:', errorText);
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error creating booking:', error);
		throw error; // Re-throw to allow proper handling in the component
	}
};
