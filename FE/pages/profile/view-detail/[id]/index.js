// [Modified HomeStayDetail.js]

// Import section (unchanged)
import { Button } from '@/components/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  MapPin,
  Star,
  Coffee,
  Check,
  Badge,
  Home,
  Unlock,
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
import TTLockUnlock from '@/components/TTlockUnlock';
import { getTTLockUserLocks } from 'pages/api/ttlock/getTTLockUserLocks';

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
  const { dataProfile } = useAuth();
  const userId = dataProfile?.id;
  const [bookingId, setBookingId] = useState('');
  const [note, setNote] = useState('');
  const [images, setImages] = useState([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [logActions, setLogActions] = useState([]);
  const [homestayDetail, setHomestayDetail] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [ttlockAccountExists, setTTLockAccountExists] = useState(false);
  const [userLocksDialog, setUserLocksDialog] = useState({
    isOpen: false,
    locks: [] 
  });
  const [hasShownUnlockButton, setHasShownUnlockButton] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted  && !dataProfile?.id) {
      toast.error('Bạn cần đăng nhập để tiếp tục.');
      setTimeout(() => router.push(`/auth/login?callbackUrl=${encodeURIComponent(window.location.href)}`), 2500);
    }
  }, [isMounted, dataProfile, router]);

  useEffect(() => {
    if (!homeStayId) return;
  
    getTTLockUserLocks(homeStayId)
      .then((response) => {
        const locksData = response?.data || [];
        console.log('Initial locks load:', locksData);
        
        setTTLockAccountExists(locksData.length > 0);
        
        // Giữ nguyên state hiện tại, chỉ cập nhật locks
        setUserLocksDialog(prev => ({
          ...prev,
          locks: locksData
        }));
      })
      .catch((err) => {
        console.error('Không lấy được danh sách khóa:', err);
        setTTLockAccountExists(false);
      });
  }, [homeStayId]); // Chỉ phụ thuộc vào homeStayId

  useEffect(() => {
    const fetchBookingHistory = async () => {
      if (!homeStayId || !userId) return;
      const res = await fetch(`https://duongcongson-001-site1.jtempurl.com/api/Booking/history`, {
        headers: { 'X-User-Id': userId },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const matching = data.find(b => b.homeStay?.id === homeStayId && b.status === 'Paid');
        if (matching) setBookingId(matching.bookingID);
      }
    };
    fetchBookingHistory();
  }, [homeStayId, userId]);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!bookingId) return;
      const logs = await getAllCheckLogs();
      setLogActions(logs.filter(log => log.bookingId === bookingId));
    };
    fetchLogs();
  }, [bookingId]);
  
  const handleShowLocks = async () => {
    try {
      const response = await getTTLockUserLocks(homeStayId);
      console.log('API Response:', response);
      
      // Kiểm tra response có đúng cấu trúc không
      const locksData = response?.data || [];
      console.log('Processed locks:', locksData);
      
      setUserLocksDialog({
        isOpen: true,
        locks: locksData
      });
      
    } catch (err) {
      console.error("Lỗi khi lấy khóa:", err);
      setUserLocksDialog({
        isOpen: true,
        locks: [] // Luôn là mảng rỗng khi lỗi
      });
      toast.error("Không thể lấy thông tin khóa");
    }
  };
  
  const ttLockUserLocksQuery = useMutation({
  mutationFn: (homeStayId) => getTTLockUserLocks(homeStayId),
  onSuccess: (response) => {
    const locksData = response?.data || [];
    setUserLocksDialog({
      isOpen: true,
      locks: locksData
    });
  },
  onError: (error) => {
    toast.error(`Lỗi khi lấy khóa: ${error.message}`);
    setUserLocksDialog(prev => ({
      ...prev,
      locks: []
    }));
  },
});
  
  const hasCheckedIn = logActions.some(log => log.actionType === 'CheckIn');
  const hasCheckedOut = logActions.some(log => log.actionType === 'CheckOut');

  const {
    data: bookings
  } = useQuery({
    queryKey: ['historyBooking'],
    queryFn: getBookingHistory,
    enabled: isMounted && !!dataProfile?.id,
  });

  const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true);
}, []);

  const handleFileChange = (e) => setImages([...e.target.files]);

  const confirmAndProceed = () => {
    setShowConfirmModal(false);
    if (confirmAction === 'checkin') handleCheckIn();
    if (confirmAction === 'checkout') handleCheckOut();
  };
  const handleCheckInClick = () => {
    setConfirmAction('checkin');
    setShowConfirmModal(true);
  };

  const handleCheckOutClick = () => {
    setConfirmAction('checkout');
    setShowConfirmModal(true);
  };

  const handleCheckIn = async () => {
    if (!dataProfile?.id || !bookingId) return toast.error('Không thể Check-in');
    try {
      const formData = new FormData();
      formData.append('BookingId', bookingId);
      formData.append('ActionType', 'CheckIn');
      formData.append('Note', note);
      images.forEach((file) => formData.append('Images', file));
      await addCheckInOutLog(formData);
      setIsCheckedIn(true);
      toast.success('Check-in thành công!', { duration: 2000 }); 
      
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
      toast.success('Check-out thành công!', { duration: 2000 });
      setTimeout(() => {
        router.push('/');
      }, 4000); 

    } catch (error) {
      console.error(error);
      toast.error('Check-out thất bại!');
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

  const [showMoreRules, setShowMoreRules] = useState(false);


  return (
    mounted && (
    <MainLayout>
      <div className="p-4 sm:p-6 md:p-8">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" /> {t('backto')}
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
        <div className="my-6">
          
          <div className="flex gap-4">
            {!hasCheckedIn && isCheckInTodayOrPast && (
              
              <div className="my-6">
              <div>Nếu gặp khó khăn hay vấn đề gì hãy ghi chú lại ở đây</div>
              <textarea
                  className="border p-3 rounded-md w-full text-sm sm:text-base"
                />
              
              <div>Cung cấp ảnh chi tiết nếu có</div>
              <input type="file" multiple onChange={handleFileChange} className="border p-2 rounded mb-2" />
              {/* Preview uploaded images */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {images.map((file, idx) => (
                    <div
                      key={idx}
                      className="relative w-full aspect-square border rounded-xl overflow-hidden shadow-md group"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`preview-${idx}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 w-full text-center bg-black/50 text-white text-xs py-1">
                        Ảnh {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
              <Button className="bg-green-600 text-white w-full sm:w-auto" onClick={handleCheckInClick} disabled={!bookingId}>
                Check In
              </Button>
              </div>
              </div>
            )}
            {hasCheckedIn && !hasCheckedOut && (
              <div className="my-6">
              <div>Đăng ảnh ở đây </div>
            <input type="file" multiple onChange={handleFileChange} className="border p-2 rounded mb-2" />
            <div>Nếu mất/ thiếu đồ hãy ghi chú vào đây </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ghi chú thêm..."
              className="border p-2 rounded w-full mb-4"
            />
              <Button className="bg-red-600 text-white" onClick={handleCheckOutClick}>
                Check Out
              </Button>
              </div>
            )}
          </div>
        </div>

        {/* Modal hiển thị quy tắc, tiện nghi, mã khóa */}
        {showConfirmModal && confirmAction === 'checkin' && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg w-[95%] max-w-md shadow-lg overflow-y-auto max-h-[90vh]">

            <h3 className="text-lg font-semibold mb-2">Quy tắc sử dụng phòng</h3>
                <div className="text-sm mb-4 space-y-2">
                  <p>🔇 Giữ yên lặng trong hành lang chung, đặc biệt từ 22h đến 6h sáng.</p>
                  <p>🗑️ Vứt rác đúng nơi quy định. Nếu đầy, mang ra khu thu gom ngoài tòa nhà.</p>
                  <p>🚫 Không tự ý di chuyển đồ đạc. Nếu cần thay đổi, hãy thông báo trước và hoàn trả đúng vị trí sau khi dùng.</p>
                  <p>💡 Tiết kiệm điện và nước. Hạn chế dùng túi ni lông.</p>
                  <p>👟 Cởi giày và đi dép trong nhà. Không đi dép trong nhà ra ngoài và ngược lại.</p>
                  <p>🚭 Không hút thuốc hoặc sử dụng chất cấm. Căn hộ chứa vật liệu dễ cháy.</p>
                  <p>⚠️ Khi rời khỏi nhà, vui lòng tắt hết thiết bị điện và điều hòa.</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold mb-2">Mở khóa từ xa:</p>
                    {ttlockAccountExists && !hasShownUnlockButton &&(
                      <Button 
                      variant="outline" 
                      onClick={() => {
                        handleShowLocks();
                        setHasShownUnlockButton(true); // Đánh dấu đã hiển thị
                      }}
                      disabled={ttLockUserLocksQuery.isLoading}
                      className="flex items-center gap-2"
                    >
                        <Unlock className="w-4 h-4" />
                        {ttLockUserLocksQuery.isLoading ? 'Đang tải...' : 'Mở khóa cửa'}
                      </Button>
                    )}
                </div>
                  <TTLockUnlock
                  isOpen={userLocksDialog.isOpen}
                  onOpenChange={(open) => setUserLocksDialog((prev) => ({ ...prev, isOpen: open }))}
                  locks={userLocksDialog.locks}
                  homeStayID={homeStayId}
                />
              <p className="font-semibold mb-2">Danh sách tiện nghi:</p>
              {!showMoreRules ? (
              <>
              <button
                onClick={() => setShowMoreRules(true)}
                className="text-blue-600 text-sm underline mb-4"
              >
                Hiển thị thêm
              </button>
              </>
              ) : (
                
              <ul className="list-disc list-inside text-sm mb-4">
                {homestayDetail?.facility?.map((f) => (
                  <li key={f.id}>{f.name}</li>
                ))}
              </ul>
              )}
              <label className="flex gap-2 items-start mb-4">
                <input
                  type="checkbox"
                  checked={agreedToRules}
                  onChange={(e) => setAgreedToRules(e.target.checked)}
                />
                <span className="text-sm">Tôi xác nhận đã đọc và đồng ý với quy tắc trên</span>
              </label>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowConfirmModal(false)}>Hủy</Button>
                <Button disabled={!agreedToRules} onClick={confirmAndProceed} className="bg-blue-600 text-white">
                 CheckIn
                </Button>
              </div>
            </div>
          </div>
        )}

        {showConfirmModal && confirmAction === 'checkout' && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Kiểm tra trước khi Check Out</h3>
              <div className="text-sm mb-4 space-y-2">
                <p>🧹 Hãy đảm bảo bạn đã dọn dẹp rác và sắp xếp lại đồ đạc như ban đầu.</p>
                <p>🔇 Tránh gây ồn khi rời khỏi phòng.</p>
                <p>⚡ Tắt hết các thiết bị điện và điều hòa trước khi rời đi.</p>
              </div>
              {!showMoreRules ? (
              <>
              <p className="font-semibold mb-2">Danh sách tiện nghi:</p>
              <button
                onClick={() => setShowMoreRules(true)}
                className="text-blue-600 text-sm underline mb-4"
              >
                Hiển thị thêm
              </button>
              </>
              ) : (
              <ul className="list-disc list-inside text-sm mb-4">
                {homestayDetail?.facility?.map((f) => (
                  <li key={f.id}>{f.name}</li>
                ))}
              </ul>
              )}
              <label className="flex gap-2 items-start mb-4">
                <input
                  type="checkbox"
                  checked={agreedToRules}
                  onChange={(e) => setAgreedToRules(e.target.checked)}
                />
                <span className="text-sm">Tôi xác nhận đã kiểm tra và tuân thủ các yêu cầu trên</span>
              </label>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowConfirmModal(false)}>Hủy</Button>
                <Button disabled={!agreedToRules} onClick={confirmAndProceed} className="bg-blue-600 text-white">
                  CheckOut
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
    )
  )
};

export default HomeStayDetail;