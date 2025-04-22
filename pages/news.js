import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function News() {
  const featuredArticles = [
    {
      id: 1,
      title: "10 Gardening Tips for Spring",
      summary: "Get your garden ready with these expert tips for spring planting and maintenance.",
      url: "https://example.com/gardening-tips"
    },
    {
      id: 2,
      title: "Top Organic Products You Should Try",
      summary: "Discover sustainable organic gardening tools and products.",
      url: "https://example.com/organic-products"
    },
    {
      id: 3,
      title: "How to Create a Balcony Garden",
      summary: "Urban gardening made easy — learn how to transform your balcony.",
      url: "https://example.com/balcony-garden"
    }
  ];

  const blogs = [
    {
      id: 1,
      title: "Composting at Home",
      image: "/images/blog1.jpg",
      url: "https://www.healthline.com/nutrition/composting-beginners-guide"
    },
    {
      id: 2,
      title: "Indoor Plants for Clean Air",
      image: "/images/blog2.jpg",
      url: "https://www.goodhousekeeping.com/home/gardening/advice/g1285/hard-to-kill-plants/"
    },
    {
      id: 3,
      title: "Herbs You Can Grow in Your Kitchen",
      image: "/images/blog3.jpg",
      url: "https://www.cookist.com/12-herbs-that-you-must-grow-in-your-kitchen-garden-for-cooking/"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-6 md:px-20 py-12 bg-[#FAF7EE] text-green-700">
        <h1 className="text-3xl font-bold mb-6">Featured News</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {featuredArticles.map(article => (
            <div
              key={article.id}
              className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="mb-4">{article.summary}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:underline"
              >
                Read Full Article →
              </a>
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-6">Blogs</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
