import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

function SendMoney() {
  const { id } = useParams(); // receiver userId
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!amount || amount <= 0) {
      setError("Enter a valid amount");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/account/transfer", {
        to: id,
        amount: Number(amount) * 100, // rupees → paise
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-linear-to-br from-[#0B1220] via-[#0F172A] to-[#020617] px-4">

      <div className="bg-white w-full max-w-md rounded-3xl
        shadow-2xl p-8">

        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-1">
          Send Money
        </h2>

        <p className="text-gray-500 mb-8">
          Enter the amount you want to transfer
        </p>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Amount (₹)
          </label>

          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 text-2xl border rounded-xl
            focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 text-sm text-red-600 bg-red-50
            border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white text-lg
            font-semibold transition
            ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-teal-700 hover:bg-[#0F172A]"
            }
          `}
        >
          {loading ? "Sending..." : "Send Money"}
        </button>

        {/* Footer */}
        <p className="text-xs text-black mt-6 text-center">
          Transfers are secure and processed instantly
        </p>

      </div>
    </div>
  );
}

export default SendMoney;
