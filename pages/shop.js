import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaShoppingBag } from "react-icons/fa";

const products = [
  { id: 1, name: "Weather Station Hub", category: "Weather Monitors", price: 79, image: "/weather-hub.jpg" },
  { id: 2, name: "Smart Plant Sensor", category: "Monitoring Devices", price: 49, image: "/smart-sensor.jpg" },
  { id: 3, name: "Garden Rake Tool", category: "Gardening Tools", price: 40, image: "/rake-tool.jpg" },
  { id: 4, name: "Wireless Rain Gauge", category: "Weather Monitors", price: 45, image: "/rain-gauge.jpg" },
];

export default function Shop() {
  const { cart, addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState("recommended");

  // Function to filter products
  const handleFilterChange = (category) => {
    let updatedFilters = [...selectedFilters];
    if (updatedFilters.includes(category)) {
      updatedFilters = updatedFilters.filter((filter) => filter !== category);
    } else {
      updatedFilters.push(category);
    }
    setSelectedFilters(updatedFilters);
  };

  // Function to sort products
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Apply filters & sorting
  useEffect(() => {
    let updatedProducts = [...products];

    // Apply Filters
    if (selectedFilters.length > 0) {
      updatedProducts = updatedProducts.filter((product) => selectedFilters.includes(product.category));
    }

    // Apply Sorting
    if (sortOption === "low-to-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [selectedFilters, sortOption]);

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar Section */}
      <nav className="flex justify-between items-center px-12 py-4 bg-[#bcd9db]">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="CloudBlooms" className="h-10 w-10" />
          <span className="text-xl font-semibold text-gray-900">CloudBlooms</span>
        </div>
        <div className="flex gap-12 text-lg font-medium text-gray-700">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/tracker">Dashboard</a>
          <a href="/article">Articles</a>
          <a href="/community">Forum</a>
          <a href="/shop" className="text-green-600">Products</a>
        </div>
        <div className="relative">
          <a href="/cart">
            <FaShoppingBag className="text-gray-900 text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cart.length}
              </span>
            )}
          </a>
        </div>
      </nav>

      {/* Shop Layout */}
      <div className="flex px-12">
        {/* Sidebar Filters */}
        <div className="w-1/4 pr-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by</h2>
          <ul className="text-gray-700">
            <li><a href="#" className="text-green-600 font-semibold">All Products</a></li>
            <li><a href="#" onClick={() => handleFilterChange("Gardening Tools")} className="hover:text-green-600">Gardening Tools</a></li>
            <li><a href="#" onClick={() => handleFilterChange("Monitoring Devices")} className="hover:text-green-600">Monitoring Devices</a></li>
            <li><a href="#" onClick={() => handleFilterChange("Weather Monitors")} className="hover:text-green-600">Weather Monitors</a></li>
          </ul>

          {/* Filters */}
          <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Filter by</h2>
          <div>
            <label className="block mb-2"><input type="checkbox" onChange={() => handleFilterChange("Weather Monitors")} /> Weather Monitors</label>
            <label className="block mb-2"><input type="checkbox" onChange={() => handleFilterChange("Gardening Tools")} /> Gardening Tools</label>
            <label className="block mb-2"><input type="checkbox" onChange={() => handleFilterChange("Monitoring Devices")} /> Monitoring Devices</label>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-3/4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">All Products</h2>

          {/* Sorting Dropdown */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700">{filteredProducts.length} products</span>
            <select className="border p-2 rounded" onChange={handleSortChange}>
              <option value="recommended">Sort by: Recommended</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          {/* Products List */}
          <div className="grid grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-green-600 text-xl font-bold">₹{product.price}.00</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
