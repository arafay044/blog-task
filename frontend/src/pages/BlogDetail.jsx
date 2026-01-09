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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading post...
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

  if (!post) return null;

  const isOwner = user && user.id === post.authorId?._id;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow mt-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">By {post.authorId?.name || "Unknown"}</p>

      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {isOwner && (
        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="bg-yellow-500 px-5 py-2 rounded hover:bg-yellow-600 transition"
          >
            Edit
          </button>
          <button
            onClick={deletePost}
            className="bg-red-600 px-5 py-2 rounded hover:bg-red-700 transition text-white"
          >
            Delete
          </button>
        </div>
      )}

      <div className="mt-6">
        <Link to="/" className="text-blue-600 hover:underline font-semibold">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
