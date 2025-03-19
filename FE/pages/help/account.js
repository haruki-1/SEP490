import Link from "next/link";

export default function AccountHelp() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Tài khoản & Bảo mật</h1>
      <p className="text-gray-600">Hướng dẫn về cách quản lý tài khoản của bạn.</p>
      <ul className="mt-6 space-y-4">
        <li>🔹 <Link href="/help/account/change-password" className="text-blue-600">Cách đổi mật khẩu</Link></li>
        <li>🔹 <Link href="/help/account/verify-email" className="text-blue-600">Xác minh email</Link></li>
        <li>🔹 <Link href="/help/account/delete" className="text-blue-600">Xóa tài khoản</Link></li>
      </ul>
    </div>
  );
}