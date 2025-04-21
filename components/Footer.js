import { FaFacebook, FaInstagram, FaLink } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F8DDCC] text-[#3A3A3A] py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between">
        {/* Left Section - Brand & Contact Info */}
        <div className="mb-8 md:mb-0">
          <h2 className="text-3xl font-serif text-[#3A3A3A]">CloudBlooms</h2>
          <div className="mt-6">
            <p className="text-md font-medium">Contact: 9966699666</p>
            <p className="text-md font-medium">Email: cloudbloom.customerservice@gmail.com</p>
            <p className="text-md mt-2">123 Greenery Street, Hyderabad,</p>
            <p className="text-md">India 500032</p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <FaFacebook className="text-2xl cursor-pointer" />
            <FaInstagram className="text-2xl cursor-pointer" />
            <FaLink className="text-2xl cursor-pointer" />
            <FaLink className="text-2xl cursor-pointer" />
          </div>
        </div>

        {/* Right Section - Newsletter */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-medium">Connect with Us Online</h3>
          <p className="text-md mt-2">Enter Email</p>

          {/* Input Field */}
          <div className="border-b border-black mt-2 mb-4">
            <input
              type="email"
              className="w-full bg-transparent outline-none py-1"
              placeholder=""
            />
          </div>

          {/* Checkbox & Subscribe Button */}
          <div className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            <label className="text-md">Yes, Subscribe me to newsletter</label>
          </div>

          <button className="mt-4 bg-[#C24F3F] text-white px-6 py-3 rounded-full text-lg">
            Subscribe
          </button>

          <p className="text-md mt-2">Get in Touch</p>
        </div>
      </div>

      {/* Bottom Copyright Text */}
      <div className="mt-16 text-center text-sm text-gray-700">
        © 2035 by CloudBlooms. Powered and secured by{" "}
        <a href="#" className="underline">
          VS Code
        </a>
      </div>
    </footer>
  );
};

export default Footer;
