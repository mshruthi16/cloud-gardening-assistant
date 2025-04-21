import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaArrowUp, FaArrowDown, FaComment } from "react-icons/fa";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // Fetch posts from API
  useEffect(() => {
    axios.get("/api/forum/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  // Submit a new post
  const handlePostSubmit = () => {
    if (!newPost.trim()) return;

    axios.post("/api/forum/posts", { content: newPost })
      .then(response => {
        setPosts([response.data, ...posts]); // Add new post to UI
        setNewPost(""); // Clear input
      })
      .catch(error => console.error("Error creating post:", error));
  };

  // Handle upvotes/downvotes
  const handleVote = (postId, type) => {
    axios.post(`/api/forum/votes`, { postId, type })
      .then(response => {
        setPosts(posts.map(post => 
          post._id === postId ? { ...post, votes: response.data.votes } : post
        ));
      })
      .catch(error => console.error("Error voting:", error));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 bg-[#FAF7EE] min-h-screen">
        <h1 className="text-3xl font-bold text-[#3A5A40] mb-6">🌱 Community Forum</h1>

        {/* Create New Post */}
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Share your thoughts..."
          />
          <button
            onClick={handlePostSubmit}
            className="mt-2 bg-[#3A5A40] text-white px-5 py-2 rounded hover:bg-[#2E4630]"
          >
            Post
          </button>
        </div>

        {/* Display Posts */}
        {posts.map(post => (
          <div key={post._id} className="bg-white p-5 rounded-lg shadow-md mb-4">
            <p className="text-[#3A5A40] text-lg">{post.content}</p>
            
            {/* Upvote/Downvote */}
            <div className="flex items-center gap-4 mt-3">
              <button onClick={() => handleVote(post._id, "up")} className="flex items-center gap-1 text-[#3A5A40] hover:text-green-700">
                <FaArrowUp /> {post.votes}
              </button>
              <button onClick={() => handleVote(post._id, "down")} className="flex items-center gap-1 text-red-500 hover:text-red-700">
                <FaArrowDown />
              </button>
              <button className="flex items-center gap-1 text-gray-700">
                <FaComment /> {post.comments?.length || 0} Comments
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
