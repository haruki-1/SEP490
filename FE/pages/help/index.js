import Link from "next/link";
import { Search, MessageSquare, HelpCircle, Users, Shield } from "lucide-react";

const helpTopics = [
  { id: 1, title: "Tài khoản & Bảo mật", icon: <Users />, link: "/help/account" },
  { id: 2, title: "Đặt phòng & Thanh toán", icon: <Shield />, link: "/help/booking" },
  { id: 3, title: "Hỗ trợ khách hàng", icon: <HelpCircle />, link: "/help/support" },
  { id: 4, title: "Chính sách hủy", icon: <MessageSquare />, link: "/help/cancel" },
];

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 py-12 text-center text-white">
        <h1 className="text-4xl font-bold">Trung tâm Hỗ trợ</h1>
        <p className="mt-2 text-lg">Chúng tôi luôn sẵn sàng hỗ trợ bạn!</p>
      </header>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mt-6 px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            className="w-full p-4 pl-12 rounded-full shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <Search className="absolute left-4 top-4 text-gray-500" />
        </div>
      </div>

      {/* Help Topics */}
      <section className="max-w-4xl mx-auto mt-8 px-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {helpTopics.map((topic) => (
          <Link key={topic.id} href={topic.link} className="p-6 bg-white shadow-md rounded-lg flex items-center space-x-4 hover:shadow-lg transition">
            <div className="text-blue-500">{topic.icon}</div>
            <h2 className="text-lg font-semibold">{topic.title}</h2>
          </Link>
        ))}
      </section>

      {/* Contact Support */}
      <div className="text-center mt-10 p-6 bg-blue-50">
        <h3 className="text-xl font-semibold">Bạn cần thêm hỗ trợ?</h3>
        <p className="text-gray-600">Liên hệ với chúng tôi để được giải đáp nhanh chóng.</p>
        <Link href="/help/contact" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          Liên hệ ngay
        </Link>
      </div>
    </div>
  );
}