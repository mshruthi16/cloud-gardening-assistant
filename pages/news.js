import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function News() {
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Fetch News Articles
  useEffect(() => {
    axios.get("/api/news") // Replace with actual API endpoint
      .then(response => setNews(response.data))
      .catch(error => console.error("Error fetching news:", error));

    axios.get("/api/blogs") // Replace with actual API endpoint
      .then(response => setBlogs(response.data))
      .catch(error => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 bg-[#FFFFFF] min-h-screen">
        <h1 className="text-3xl font-bold text-[#3A5A40] mb-6">📰 Featured News</h1>

        {/* Featured News Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <div key={article.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-[#3A5A40] mb-2">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {article.title}
                </a>
              </h2>
              <p className="text-gray-700">{article.summary}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline mt-2 block">
                Read Full Article →
              </a>
            </div>
          ))}
        </div>

        {/* Blog Section */}
        <h1 className="text-3xl font-bold text-[#3A5A40] mt-12 mb-6">📖 Gardening Blogs</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-3" />
              <h2 className="text-xl font-semibold text-[#3A5A40] mb-2">{blog.title}</h2>
              <p className="text-gray-700">{blog.summary}</p>
              <a href={`/blogs/${blog.id}`} className="mt-3 inline-block bg-[#3A5A40] text-white px-4 py-2 rounded hover:bg-[#2E4630]">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
