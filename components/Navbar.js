import { useState } from "react";
import Link from "next/link"; // Import Link for Next.js routing
import { FaShoppingBag, FaUser } from "react-icons/fa";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0); // Dummy cart count for now

  return (
    <nav className="flex justify-between items-center px-12 py-4 w-full bg-[#C7E5E0]">
      {/* Left: Logo */}
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="CloudBlooms" className="h-10 w-10" />
        <span className="text-xl font-semibold text-gray-900">CloudBlooms</span>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex gap-8">
        <Link href="/" className="text-gray-700 hover:text-green-600 text-lg font-medium">Home</Link>
        <Link href="/about" className="text-gray-700 hover:text-green-600 text-lg font-medium">About</Link>
        <Link href="/shop" className="text-gray-700 hover:text-green-600 text-lg font-medium">Products</Link>
        <Link href="/tracker" className="text-gray-700 hover:text-green-600 text-lg font-medium">Dashboard</Link>
        <Link href="/news" className="text-gray-700 hover:text-green-600 text-lg font-medium">Articles</Link>
        <Link href="/forum" className="text-gray-700 hover:text-green-600 text-lg font-medium">Forum</Link>
      </div>

      {/* Right: Cart & Login */}
      <div className="flex items-center gap-6">
        {/* Login Icon */}
        <Link href="/login" className="text-gray-700 hover:text-green-600 text-lg font-medium flex items-center gap-2">
          <FaUser className="text-xl" />
          <span>Login</span>
        </Link>

        {/* Shopping Cart Icon */}
        <Link href="/cart" className="relative">
          <FaShoppingBag className="text-2xl text-gray-700 hover:text-green-600" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
