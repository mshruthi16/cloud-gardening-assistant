const offerings = [
    { name: "Seeds", icon: "/icons/seeds.png" },
    { name: "Plants", icon: "/icons/plants.png" },
    { name: "Tools", icon: "/icons/tools.png" },
    { name: "Accessories", icon: "/icons/accessories.png" },
    { name: "Organic Products", icon: "/icons/organic-products.png" },
    { name: "Gardening Kits", icon: "/icons/gardening-kits.png" },
  ];
  
  const OurOfferings = () => {
    return (
      <section className="bg-[#F9F7EF] py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          {/* Section Title */}
          <h2 className="text-4xl font-serif text-[#1D2B40] mb-12">Our Offerings</h2>
  
          {/* Offerings Grid */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-12 items-center">
            {offerings.map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />
                <p className="text-xl font-medium text-[#1D2B40]">{item.name}</p>
              </div>
            ))}
          </div>
  
          {/* Divider Line */}
          <div className="mt-16 border-t border-gray-300 w-full mx-auto"></div>
        </div>
      </section>
    );
  };
  
  export default OurOfferings;
  