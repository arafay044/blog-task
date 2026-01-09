import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
      {/* Brand Logo */}
      <Link 
        to="/" 
        className="font-black text-2xl tracking-tighter text-slate-900 flex items-center gap-2 group"
      >
        <span className="bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-lg group-hover:bg-indigo-700 transition-colors">
          M
        </span>
        MyBlog
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        <Link 
          to="/" 
          className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          Home
        </Link>

        {user ? (
          <div className="flex items-center gap-6">
            <Link 
              to="/create" 
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Create Post
            </Link>
            <button
              onClick={logout}
              className="text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-full shadow-lg shadow-slate-200 transition-all active:scale-95"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Link 
              to="/login" 
              className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-full shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;