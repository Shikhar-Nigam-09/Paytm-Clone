import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

function Signin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await api.post("/user/signin", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[320px]">
      <h2 className="text-3xl font-bold text-gray-800 mb-1">
        Sign In
      </h2>

      <p className="text-gray-500 mb-8">
        Access your account securely
      </p>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        name="username"
        type="email"
        placeholder="Enter your email"
        value={form.username}
        onChange={handleChange}
        className="w-full mb-4 p-3 border border-gray-300 rounded-lg bg-white
        focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        required
      />

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Password <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={form.password}
        onChange={handleChange}
        className="w-full mb-6 p-3 border border-gray-300 rounded-lg bg-white
        focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
        required
      />

      {error && (
        <p className="text-red-500 text-sm mb-4">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition
        ${loading ? "bg-blue-300" : "bg-blue-700 hover:bg-blue-800"}`}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default Signin;
