import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
  return (
    <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 mb-6">
      <div className="flex flex-col h-full justify-between">
        <div>
          {/* Subtle Tag/Category placeholder */}
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-4">
            Article
          </span>
          
          <Link to={`/post/${post._id}`}>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
              {post.title}
            </h2>
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
              {post.authorId?.name?.charAt(0) || "U"}
            </div>
            <p className="text-sm font-medium text-slate-500">
              {post.authorId?.name || "Unknown"}
            </p>
          </div>
        </div>

        <Link
          to={`/post/${post._id}`}
          className="inline-flex items-center text-indigo-600 font-bold text-sm group/link"
        >
          Read Full Story
          <svg 
            className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;