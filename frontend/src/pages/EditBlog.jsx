import { useEffect, useState } from "react";
import axios from "../api/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load post");
        setLoading(false);
      });
  }, [id]);

  const savePost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await axios.put(`/posts/${id}`, { title, content });
      navigate(`/post/${id}`);
    } catch {
      alert("Failed to update post");
    }
    setSaving(false);
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

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-10">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <ReactQuill value={content} onChange={setContent} theme="snow" />
      <button
        onClick={savePost}
        disabled={saving}
        className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default EditBlog;
