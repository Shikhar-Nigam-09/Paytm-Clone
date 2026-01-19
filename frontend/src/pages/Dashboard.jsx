import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Protect route */
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  /* Fetch balance */
  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await api.get("/account/balance");
        setBalance(res.data.balance);
      } catch (err) {
        setError("Failed to fetch balance");
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchBalance();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1220] via-[#0F172A] to-[#020617]">

      {/* NAVBAR */}
      <div className="flex items-center justify-between px-10 py-6 text-white">
        

        
      </div>

      {/* MAIN CONTENT */}
      <div className="px-10 mt-10 max-w-6xl mx-auto">

        {/* BALANCE CARD */}
        <div className="bg-linear-to-brr from-[#0A2540] to-[#1E40AF]
          rounded-3xl p-10 text-white shadow-2xl mb-10">

          <p className="text-blue-200 text-sm uppercase tracking-widest mb-2">
            Available Balance
          </p>

          <h2 className="text-5xl font-bold mb-6">
            {loading ? "Loading..." : `₹${(balance/100).toLocaleString()}`}
          </h2>

          {error && (
            <p className="text-red-300 text-sm mb-2">
              {error}
            </p>
          )}

          <p className="text-blue-100">
            Safe • Secure • Instant Transfers
          </p>
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* SEND MONEY */}
          <div
            onClick={() => navigate("/users")}
            className="cursor-pointer bg-white rounded-2xl p-8 shadow-lg
            hover:shadow-2xl transition group"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Send Money
            </h3>

            <p className="text-gray-500 mb-6">
              Transfer funds instantly to anyone
            </p>

            <div className="text-blue-700 font-semibold group-hover:underline">
              Proceed →
            </div>
          </div>

          {/* TRANSACTIONS */}
          <div
            onClick={() => navigate("/transactions")}
            className="cursor-pointer bg-white rounded-2xl p-8 shadow-lg
            hover:shadow-2xl transition group"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Transaction History
            </h3>

            <p className="text-gray-500 mb-6">
              Track all incoming & outgoing payments
            </p>

            <div className="text-blue-700 font-semibold group-hover:underline">
              View →
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
