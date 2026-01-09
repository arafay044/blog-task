import { useEffect, useState } from "react";
import axios from "../api/axios";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load posts.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center">Latest Blogs</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
