import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center py-16">
      <h1 className="text-5xl font-bold">Bloom Where Planted</h1>
      <p className="text-lg mt-4">Explore a World of Blooms, Seeds & Gardening Essentials</p>
      
      <Link href="/shop">
        <button className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-full transition-transform transform hover:scale-105 active:scale-95 cursor-pointer">
          Shop Now
        </button>
      </Link>
    </section>
  );
}
