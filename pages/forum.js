import { useState } from "react";
import { FaArrowUp, FaArrowDown, FaComment } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Forum() {
  // Dummy posts data with comments initialized as empty arrays
  const [posts, setPosts] = useState([
    { id: 1, content: "What's the best way to grow tomatoes?", votes: 5, comments: ["Great question!", "Try using compost."] },
    { id: 2, content: "Tips for keeping indoor plants healthy?", votes: 10, comments: ["Keep them near sunlight.", "Water them weekly."] },
  ]);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState("");

  // Handle adding new post
  const handlePostSubmit = () => {
    if (!newPost.trim()) return;

    const newPostObj = {
      id: posts.length + 1, // Fake ID for now
      content: newPost,
      votes: 0,
      comments: [],
    };
    setPosts([newPostObj, ...posts]);
    setNewPost(""); // Clear input
  };

  // Handle adding new comment to a post
  const handleCommentSubmit = (postId) => {
    if (!newComment.trim()) return;

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
    setNewComment(""); // Clear comment input
  };

  // Handle upvote/downvote (frontend only)
  const handleVote = (postId, type) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, votes: post.votes + (type === "up" ? 1 : -1) }
        : post
    ));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8 bg-white">
        <h1 className="text-2xl font-bold text-green-700 mb-6">Community Forum</h1>

        {/* Create New Post */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Share your thoughts..."
          />
          <button
            onClick={handlePostSubmit}
            className="mt-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Post
          </button>
        </div>

        {/* Display Posts */}
        {posts.map(post => (
          <div key={post.id} className="border-b p-4 mb-4">
            <p className="text-gray-800">{post.content}</p>

            {/* Upvote/Downvote */}
            <div className="flex items-center gap-4 mt-2">
              <button onClick={() => handleVote(post.id, "up")} className="flex items-center gap-1 text-blue-700">
                <FaArrowUp /> {post.votes}
              </button>
              <button onClick={() => handleVote(post.id, "down")} className="flex items-center gap-1 text-red-500">
                <FaArrowDown />
              </button>
              <button className="flex items-center gap-1 text-gray-700">
                <FaComment /> {post.comments.length} Comments
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Add a comment..."
              />
              <button
                onClick={() => handleCommentSubmit(post.id)}
                className="mt-2 bg-green-700 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Add Comment
              </button>

              {/* Display Comments */}
              <div className="mt-4">
                {post.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-2 mb-2 rounded-lg">
                    <p className="text-gray-700">{comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
