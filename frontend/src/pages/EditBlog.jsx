import { useEffect, useState } from "react";
import axios from "../api/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams, Link } from "react-router-dom";

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
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    try {
      await axios.put(`/posts/${id}`, { title, content });
      navigate(`/post/${id}`);
    } catch {
      alert("Failed to update post");
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 font-medium">Fetching your story...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pt-12 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            >
              ←
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Edit Story</h1>
              <p className="text-sm text-slate-500 font-medium italic">Modifying "{title.substring(0, 20)}..."</p>
            </div>
          </div>

          <button
            onClick={savePost}
            disabled={saving}
            className={`px-8 py-3 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg 
              ${saving 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100"
              }`}
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>

        {/* Writing Canvas */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden focus-within:border-indigo-200 transition-colors">
          <div className="p-8 md:p-12 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest ml-1">Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-3xl md:text-5xl font-black text-slate-900 placeholder-slate-200 outline-none border-none focus:ring-0 p-0"
              />
            </div>
            
            <div className="h-px bg-slate-100 w-full" />

            <div className="quill-custom-provider">
              <ReactQuill 
                value={content} 
                onChange={setContent} 
                theme="snow" 
                className="write-quill"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .write-quill .ql-toolbar.ql-snow {
          border: none;
          background: #fffbeb; /* Light amber tint for edit mode */
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
          min-height: 450px;
          padding: 0;
          color: #334155;
          line-height: 1.8;
        }
      `}</style>
    </div>
  );
};

export default EditBlog;