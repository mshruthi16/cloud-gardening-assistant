const OurStory = () => {
    return (
      <section className="bg-[#FAF7EE] py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div>
            <img
              src="/images/our-story.jpg"  // Replace with your actual image path
              alt="Green Initiative Story"
              className="w-full rounded-lg shadow-md"
            />
          </div>
  
          {/* Right - Text */}
          <div>
            <h2 className="text-4xl font-serif text-[#1D2B40] leading-snug">
              Our Green <br /> Initiative Story
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              CloudBlooms is your go-to online store for all things gardening.
              Our passion lies in providing high-quality seeds, plants, tools,
              and accessories to nurture your green space. We aim to inspire,
              educate, and empower garden enthusiasts of all levels. Join us in
              cultivating beauty and sustainability in your outdoor haven.
            </p>
            <button className="mt-6 px-6 py-3 bg-[#C6574E] text-white text-lg font-semibold rounded-full shadow-md hover:bg-[#B04642] transition">
              Read More
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default OurStory;
  