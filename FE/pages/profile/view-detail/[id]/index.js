import { Button } from '@/components/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  MapPin,
  Star,
  Coffee,
  Check,
  Badge,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import MainLayout from 'pages/layout';
import React, { useEffect, useState } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from 'next-i18next';
import { toast } from 'sonner';
import { addCheckInOutLog } from 'pages/api/checklog/addCheckInOutLog';
import { useAuth } from 'context/AuthProvider';
import { getBookingHistory } from 'pages/api/homestay/getHomeStayByUser';
import { Card } from '@/components/components/ui/card';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { getAllCheckLogs } from 'pages/api/checklog/getAllCheckLog';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const HomeStayDetail = () => {
  const { id } = useParams() ?? {};
  const homeStayId = id;
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingIdFromQuery = searchParams.get('bookingId');
  const { t } = useTranslation('common');
  const { dataProfile, refetch } = useAuth();
  const userId = dataProfile?.id;
  const [bookingId, setBookingId] = useState('');
  const [note, setNote] = useState('');
  const [images, setImages] = useState([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [logActions, setLogActions] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !dataProfile?.id) {
      toast.error('Bạn cần đăng nhập để tiếp tục.');
      setTimeout(() => router.push(`/auth/login?callbackUrl=${encodeURIComponent(window.location.href)}`), 2500);
    }
  }, [isMounted, dataProfile, router]);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      if (!homeStayId || !userId) return;
  
      const res = await fetch(`https://duongcongson-001-site1.jtempurl.com/api/Booking/history`, {
        headers: {
          'X-User-Id': userId,
        },
      });

      const data = await res.json();
  
      if (Array.isArray(data)) {
        // Lọc ra booking có homestayId trùng
        const matchingBooking = data.find(
          (b) => b.homeStay?.id === homeStayId && b.status === 'Paid'
        );
  
        if (matchingBooking) {
          setBookingId(matchingBooking.bookingID);
        }
      }
    };
  
    fetchBookingHistory();
  }, [homeStayId, userId]);
  
  useEffect(() => {
    const fetchLogs = async () => {
      if (!bookingId) return;
      const logs = await getAllCheckLogs();
      const logsForBooking = logs.filter((log) => log.bookingId === bookingId);
      setLogActions(logsForBooking);
    };
  
    fetchLogs();
  }, [bookingId]);

  const hasCheckedIn = logActions.some(log => log.actionType === 'CheckIn');
  const hasCheckedOut = logActions.some(log => log.actionType === 'CheckOut');

  const {
    data: bookings,
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useQuery({
    queryKey: ['historyBooking'],
    queryFn: getBookingHistory,
    enabled: isMounted && !!dataProfile?.id,
  });

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleCheckIn = async () => {
    if (!dataProfile || !dataProfile.id) {
      toast.error('Bạn cần đăng nhập để Check-in!');
      router.push('/login'); // hoặc trang đăng nhập của bạn
      return;
    }
    if (!bookingId) {
      toast.error('Booking ID not found!');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('BookingId', bookingId);
      formData.append('ActionType', 'CheckIn');
      formData.append('Note', note);
      images.forEach((file) => formData.append('Images', file));
  
      console.log('FormData sent:', {
        BookingId: bookingId,
        ActionType: 'CheckIn',
        Note: note,
        Images: images.length,
      });
  
      await addCheckInOutLog(formData);
  
      setIsCheckedIn(true);
      toast.success('Check-in successful!',{duration: 2000});
      startAutoCheckoutTimer();
      setTimeout(() => {
      router.push('/'); 
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('Check-in thất bại!');
    }
  };

  const handleCheckOut = async () => {
    try {
      const formData = new FormData();
      formData.append('BookingId', bookingId);
      formData.append('ActionType', 'CheckOut');
      formData.append('Note', note);

      await addCheckInOutLog(formData);
      setIsCheckedOut(true);
      toast.success('Check-out successful!',{duration: 2000});
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Failed to check-out!');
    }
  };

  const startAutoCheckoutTimer = () => {
    if (!homestay?.checkOutTime) return;

    const [checkoutHour, checkoutMinute] = homestay.checkOutTime.split(':').map(Number);
    const now = new Date();
    const checkoutToday = new Date();
    checkoutToday.setHours(checkoutHour, checkoutMinute, 0, 0);

    const timeout = checkoutToday.getTime() - now.getTime();
    if (timeout > 0) {
      setTimeout(() => handleCheckOut(), timeout);
    } else {
      handleCheckOut();
    }
  };

  const filteredBookings = Array.isArray(bookings)
  ? bookings.filter((booking) => {
      if (booking.status !== 'Paid' || booking.homeStay?.id !== homeStayId) return false;

      const checkIn = dayjs(booking.checkInDate, "DD/MM/YYYY HH:mm");
      const checkOut = dayjs(booking.checkOutDate, "DD/MM/YYYY HH:mm");
      const today = dayjs(); // hoặc dayjs().startOf('day') nếu bạn không quan tâm giờ phút

      return checkIn.isSameOrBefore(today, 'day') && checkOut.isSameOrAfter(today, 'day');
    })
  : [];

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Bỏ giờ phút giây để so sánh chính xác theo ngày
  
  const currentBooking = filteredBookings?.[0];
  
  const checkInDate = currentBooking ? new Date(currentBooking.checkInDate) : null;
  const checkOutDate = currentBooking ? new Date(currentBooking.checkOutDate) : null;
  
  const isCheckInTodayOrPast = checkInDate && today >= new Date(checkInDate.setHours(0, 0, 0, 0));
  const isBeforeCheckOut = checkOutDate && today <= new Date(checkOutDate.setHours(0, 0, 0, 0));

return (
  <MainLayout>
    <div className="sec-com bg-gradient-to-b from-blue-50 to-white">
      <div className="px-4 container-lg">
        <Button
          variant="ghost"
          className="flex items-center mb-6 text-gray-600 hover:bg-white/80"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('backto')}
        </Button>

        {/* Homestay Details */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <Card key={booking.id || booking.bookingID} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full h-48 md:w-1/3">
                    {booking.homeStay?.mainImage ? (
                      <Image
                        src={booking.homeStay?.mainImage}
                        alt="homestay-history"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-200">
                        <Home className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {booking.homeStay?.name || 'Homestay'}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{booking.homeStay?.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium">No Paid Bookings found</h3>
            </div>
          )}
        </div>

        {/* Checkin - Checkout Section */}
        <div className="flex flex-col gap-4">
          <input type="file" multiple onChange={handleFileChange} className="border p-2 rounded" />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter notes if any..."
            className="border p-2 rounded w-full"
          />
          <div className="flex gap-4">
            {dataProfile?.id && !hasCheckedIn && (
              <Button className="bg-green-600 text-white" 
                      onClick={handleCheckIn}
                      disabled={!bookingId || !isCheckInTodayOrPast}>
                Check In
              </Button>
            )}
            {hasCheckedIn && !hasCheckedOut && (
              <Button className="bg-red-600 text-white" 
                      onClick={handleCheckOut}>
                Check Out
              </Button>
            )}
          </div>

          {/* Preview uploaded images */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {images.map((file, idx) => (
                <div key={idx} className="relative w-full h-32">
                  <Image src={URL.createObjectURL(file)} alt="Preview" fill className="object-cover rounded" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </MainLayout>
  );
};

export default HomeStayDetail;
