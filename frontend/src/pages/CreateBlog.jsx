import { useState } from "react";
import axios from "../api/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/posts", { title, content });
      navigate("/");
    } catch {
      alert("Error creating post");
    }
    setLoading(false);
  };

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
        onClick={submitPost}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
};

export default CreateBlog;
