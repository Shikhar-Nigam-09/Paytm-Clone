import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Hide navbar if not logged in
  if (!token) return null;

  return (
    <nav className="sticky top-0 z-50 bg-[#F8FAFC]/90 backdrop-blur
      border-b border-slate-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4
        flex items-center justify-between">

        {/* BRAND */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-lg
            bg-linear-to-br from-blue-700 to-blue-500
            flex items-center justify-center
            text-white font-bold text-lg">
            P
          </div>

          <h1 className="text-xl font-bold text-[#0F172A] tracking-wide">
            Paytm<span className="text-blue-600">X</span>
          </h1>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-2 sm:gap-4">

          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg text-sm font-medium
              text-slate-700 hover:bg-slate-100 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/users"
            className="px-4 py-2 rounded-lg text-sm font-medium
              text-slate-700 hover:bg-slate-100 transition"
          >
            Send Money
          </Link>

          <Link
            to="/transactions"
            className="px-4 py-2 rounded-lg text-sm font-medium
              text-slate-700 hover:bg-slate-100 transition"
          >
            Transactions
          </Link>

          {/* LOGOUT */}
          <button
            onClick={() => {
              logout();
              navigate("/signin");
            }}
            className="ml-2 px-5 py-2 rounded-lg
              bg-blue-600 text-white text-sm font-semibold
              hover:bg-blue-700 transition shadow-sm"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
