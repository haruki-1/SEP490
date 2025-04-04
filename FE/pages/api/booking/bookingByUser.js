import api from "@/utils/api";

export const getHomeStayByUser = async (userID, filters = {}) => {
	try {
		const { amenityNames, priceRange, standard, searchText } = filters;

		// Build query parameters
		let queryParams = `userID=${userID}`;

		// Add optional filter parameters
		if (amenityNames && amenityNames.length > 0) {
			amenityNames.forEach((amenity) => {
				queryParams += `&AmenityNames=${encodeURIComponent(amenity)}`;
			});
		}

		// Only add price range parameters if they are explicitly set and not at default values
		if (priceRange && priceRange.length === 2) {
			// Only add MinPrice if it's greater than 0 (the default min)
			if (priceRange[0] > 0) {
				queryParams += `&MinPrice=${priceRange[0]}`;
			}

			// Only add MaxPrice if it's less than the maximum value
			// This means no upper limit is applied by default
			if (priceRange[1] < 99999999) {
				queryParams += `&MaxPrice=${priceRange[1]}`;
			}
		}

		// Make sure standard ratings are properly passed
		if (standard && standard.length > 0) {
			standard.forEach((rating) => {
				queryParams += `&Standard=${encodeURIComponent(rating)}`;
			});
		}

		if (searchText) {
			queryParams += `&SearchText=${encodeURIComponent(searchText)}`;
		}

		// Log the query for debugging
		console.log('API Query:', queryParams);

		const response = await api.get(`/HomeStay/get-home-stay-by-user?${queryParams}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching homestays by user:', error);
		throw error;
	}
};

