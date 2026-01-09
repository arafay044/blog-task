import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load post.");
        setLoading(false);
      });
  }, [id]);

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`/posts/${id}`);
        navigate("/");
      } catch {
        alert("Failed to delete post.");
      }
    }
  };

  if (loading) return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 font-medium">Loading story...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="text-center bg-red-50 p-6 rounded-2xl">
        <p className="text-red-600 font-bold">{error}</p>
        <Link to="/" className="text-slate-600 underline mt-2 block">Return Home</Link>
      </div>
    </div>
  );

  if (!post) return null;

  const isOwner = user && (user.id === post.authorId?._id || user._id === post.authorId?._id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Navigation Header */}
      <Link to="/" className="text-indigo-600 font-bold text-sm flex items-center mb-10 group">
        <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> BACK TO HOME
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
              {post.authorId?.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="text-slate-900 font-bold">{post.authorId?.name || "Unknown"}</p>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Author</p>
            </div>
          </div>

          {isOwner && (
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/edit/${id}`)}
                className="text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
              >
                Edit
              </button>
              <button
                onClick={deletePost}
                className="text-xs font-bold px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <article className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed mb-20">
        <div 
          className="blog-content-wrapper"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>

      <footer className="border-t border-slate-100 pt-10 text-center">
        <p className="text-slate-400 text-sm italic">End of story</p>
      </footer>
    </div>
  );
};

export default BlogDetail;