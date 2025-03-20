import { useRouter } from 'next/router';

const ToggleButton = ({ isMapView }) => {
  const router = useRouter();

  const handleToggle = () => {
    if (isMapView) {
      router.push('/index'); // Navigate to the list view
    } else {
      router.push('/map'); // Navigate to the map view
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
    >
      {isMapView ? 'Xem Danh Sách' : 'Xem Bản Đồ'}
    </button>
  );
};

export default ToggleButton;