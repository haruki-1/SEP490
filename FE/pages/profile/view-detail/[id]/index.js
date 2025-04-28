import { Button } from '@/components/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  MapPin,
  Star,
  Coffee,
  Check,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getHomeStayDetail } from 'pages/api/homestay/getHomeStayDetail';
import MainLayout from 'pages/layout';
import React, { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from 'next-i18next';
import { toast } from 'sonner';
import { addCheckInOutLog } from 'pages/api/checklog/addCheckInOutLog';
import { useAuth } from 'context/AuthProvider';

const HomeStayDetail = () => {
  const { id } = useParams() ?? {};
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingIdFromQuery = searchParams.get('bookingId');
  const { t } = useTranslation('common');
  const { dataProfile, refetch } = useAuth();

  const [bookingId, setBookingId] = useState('');
  const [note, setNote] = useState('');
  const [images, setImages] = useState([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['homeStayDetail', id],
    queryFn: () => getHomeStayDetail(id),
    enabled: !!id,
  });

  const homestay = data || [];

  useEffect(() => {
    if (!bookingIdFromQuery) {
      toast.error('Booking ID not found!');
    } else {
      setBookingId(bookingIdFromQuery);
    }
  }, [bookingIdFromQuery]);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleCheckIn = async () => {
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
      toast.success('Check-in successful!');
      setTimeout(() => router.back(), 2000);
      startAutoCheckoutTimer();
    } catch (error) {
      console.error('Check-in error:', error.response || error);
      toast.error('Failed to check-in!');
    }
  };

  const handleCheckOut = async () => {
    try {
      const formData = new FormData();
      formData.append('BookingId', bookingId);
      formData.append('ActionType', 'CheckOut');
      formData.append('Note', '');

      await addCheckInOutLog(formData);
      setIsCheckedOut(true);
      toast.success('Check-out successful!');
      setTimeout(() => router.back(), 2000);
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

  return (
    <MainLayout>
      <div className='sec-com bg-gradient-to-b from-blue-50 to-white'>
        <div className='px-4 container-lg'>
          <Button
            variant='ghost'
            className='flex items-center mb-6 text-gray-600 hover:bg-white/80'
            onClick={() => router.back()}
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            {t('backto')}
          </Button>

          <div className='p-4 space-y-6 bg-white shadow-lg sm:p-6 lg:p-8 rounded-2xl'>
            <PhotoProvider>
              <div className='flex flex-col h-full gap-4'>
                <div className='relative overflow-hidden shadow-lg rounded-2xl aspect-video'>
                  <Swiper
                    modules={[Navigation, Pagination, EffectFade, Autoplay]}
                    effect='fade'
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={homestay?.homeStayImage?.length > 1}
                    className='w-full h-full'
                  >
                    {homestay?.homeStayImage?.map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <PhotoView src={img.image}>
                          <Image src={img.image} alt={homestay.name} fill className='object-cover' />
                        </PhotoView>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {homestay.isBooked && (
                    <div className='absolute top-4 left-4 z-10 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md font-bold'>
                      <span className='mr-1 animate-pulse'>●</span> BOOKED
                    </div>
                  )}
                </div>
              </div>
            </PhotoProvider>

            <div className='flex flex-col gap-8'>
              <div>
                <h1 className='text-2xl font-bold'>{homestay.name}</h1>
                <div className='flex items-center text-gray-500'>
                  <MapPin className='w-4 h-4 mr-1 text-blue-500' />
                  <span>{homestay.address}, {homestay.city}</span>
                </div>
                <div className='flex items-center mt-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${homestay.standar > i ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>

              {/* Checkin - Checkout Section */}
              <div className='flex flex-col gap-4'>
                <input type='file' multiple onChange={handleFileChange} className='border p-2 rounded' />
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder='Enter notes if any...'
                  className='border p-2 rounded w-full'
                />

                <div className='flex gap-4'>
                  {!isCheckedIn && (
                    <Button className='bg-green-600 text-white' onClick={handleCheckIn} disabled={!bookingId}>
                      Check In
                    </Button>
                  )}
                  {isCheckedIn && !isCheckedOut && (
                    <Button className='bg-red-600 text-white' onClick={handleCheckOut}>
                      Check Out
                    </Button >
                  )}
                </div>

                {/* Preview uploaded images */}
                {images.length > 0 && (
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6'>
                    {images.map((file, idx) => (
                      <div key={idx} className='relative w-full h-32'>
                        <Image src={URL.createObjectURL(file)} alt='Preview' fill className='object-cover rounded' />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeStayDetail;
