import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="font-bold text-2xl tracking-wide hover:text-blue-200">
        MyBlog
      </Link>

      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        {user ? (
          <>
            <Link to="/create" className="hover:underline">
              Create Post
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
