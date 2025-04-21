import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border p-4 mb-2 rounded bg-white shadow">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-green-600 font-bold">₹{item.price}.00</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total Price Section */}
          <div className="mt-6 p-4 bg-gray-100 rounded shadow">
            <h2 className="text-xl font-semibold">Total: ₹{totalPrice}.00</h2>
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
