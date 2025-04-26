import React, { useState } from 'react';
import axios from 'axios';

const CheckInOutForm = () => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:3000/api/CheckInOutLog', {
        userId,
        checkInTime,
        checkOutTime,
      });

      setMessage('Gửi dữ liệu thành công! 🎉');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMessage('Gửi dữ liệu thất bại! ❌');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Check In / Check Out</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Check In Time:</label>
          <input
            type="datetime-local"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Check Out Time:</label>
          <input
            type="datetime-local"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Gửi
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default CheckInOutForm;
