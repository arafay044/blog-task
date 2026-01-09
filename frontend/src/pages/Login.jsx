import { useState, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center px-6">
      {/* Brand Icon/Logo Placeholder */}
      <Link to="/" className="mb-8 flex items-center gap-2 group">
        <div className="bg-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-lg shadow-indigo-100 font-black text-xl group-hover:bg-indigo-700 transition-colors">
          M
        </div>
      </Link>

      <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
          <p className="text-slate-500 font-medium">Please enter your details to sign in</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold border border-red-100 animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all font-medium"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                Password
              </label>
              <Link to="#" className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-widest">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-4 rounded-2xl font-black tracking-wide text-sm transition-all active:scale-[0.98] shadow-lg shadow-indigo-100 
              ${loading 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5"
              }`}
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN"}
          </button>
        </form>

        <p className="mt-10 text-center text-slate-500 font-medium text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-black hover:text-indigo-800 transition-colors">
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;