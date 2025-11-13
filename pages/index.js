import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MarqueeText from "../components/MarqueeText";
import FeaturedProducts from "../components/FeaturedProducts";
import OurStory from "../components/OurStory";
import OurOfferings from "../components/OurOfferings";
import Footer from "../components/Footer"; 

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <MarqueeText />
      <img src="/background.jpg" alt="Garden" className="w-full mt-4" />
      <FeaturedProducts />
      <OurStory />
      <OurOfferings />
      <Footer />
    </div>
  );
}
