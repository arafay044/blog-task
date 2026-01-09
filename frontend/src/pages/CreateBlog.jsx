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
      alert("Please add a title and some content before publishing.");
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
    <div className="min-h-screen bg-slate-50/50 pt-12 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Write a Story</h1>
            <p className="text-sm text-slate-500 font-medium">Drafting your next big idea</p>
          </div>
          <button
            onClick={submitPost}
            disabled={loading}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg shadow-indigo-100 
              ${loading 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5"
              }`}
          >
            {loading ? "Publishing..." : "Publish Story"}
          </button>
        </div>

        {/* Input Canvas */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 md:p-12 space-y-6">
            <input
              type="text"
              placeholder="Title of your story..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl md:text-5xl font-black text-slate-900 placeholder-slate-200 outline-none border-none focus:ring-0 p-0"
            />
            
            <div className="h-px bg-slate-100 w-full" />

            {/* Custom Styled Quill Wrapper */}
            <div className="quill-custom-provider">
              <ReactQuill 
                value={content} 
                onChange={setContent} 
                theme="snow" 
                placeholder="Tell your story..."
                className="write-quill"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scoped CSS to clean up ReactQuill's default look */}
      <style>{`
        .write-quill .ql-toolbar.ql-snow {
          border: none;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 1rem;
          padding: 12px;
        }
        .write-quill .ql-container.ql-snow {
          border: none;
          font-family: inherit;
          font-size: 1.125rem;
        }
        .write-quill .ql-editor {
          min-height: 400px;
          padding: 0;
          color: #334155;
          line-height: 1.8;
        }
        .write-quill .ql-editor.ql-blank::before {
          left: 0;
          color: #cbd5e1;
          font-style: normal;
        }
      `}</style>
    </div>
  );
};

export default CreateBlog;