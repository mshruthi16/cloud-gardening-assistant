import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    name: "Weather Station Hub",
    price: "₹79.00",
    image: "/weather-station.png",
  },
  {
    name: "Smart Plant Sensor",
    price: "₹49.00",
    image: "/smart-plant-sensor.png",
  },
  {
    name: "Garden Rake Tool",
    price: "₹40.00",
    image: "/garden-rake.png",
  },
  {
    name: "Wireless Rain Gauge",
    price: "₹45.00",
    image: "/rain-gauge.png",
  },
];

export default function FeaturedProducts() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="bg-[#D2E8E3] py-16">
      <h2 className="text-4xl font-semibold text-center text-[#22344D] mb-8">
        Featured Products
      </h2>
      <div className="relative max-w-6xl mx-auto">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex gap-6 overflow-hidden">
          {products.slice(index, index + 3).map((product, i) => (
            <div key={i} className="w-1/3 bg-white p-4 rounded-lg shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="text-lg text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
