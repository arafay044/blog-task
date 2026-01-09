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

  if (loading) return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-400 font-medium tracking-wide">Gathering stories...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-4xl mb-4">emojis/sad-face.png</div>
        <p className="text-slate-900 font-black text-xl mb-2">Something went wrong</p>
        <p className="text-slate-500">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-24">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="border-l-4 border-indigo-600 pl-6 py-2">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4">
            The <span className="text-indigo-600">Journal.</span>
          </h1>
          
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {posts.length === 0 ? (
          <div className="bg-slate-50 rounded-[3rem] py-20 text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-xl">No stories have been shared yet.</p>
            <p className="text-slate-300">Check back later or start writing yourself!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post, index) => (
              <div 
                key={post._id}
                className={index === 0 ? "md:col-span-2 lg:col-span-2" : "col-span-1"}
              >
                <BlogCard post={post} isFeatured={index === 0} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;