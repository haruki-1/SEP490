export const addCheckInOutLog = async (formData) => {
  const url = 'https://duongcongson-001-site1.jtempurl.com/api/CheckInOutLog/add-log';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
      },
      body: formData, // 🆕 Gửi dạng multipart/form-data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};