import { useState } from "react";
import api from "../api/api";

function Signup({ onSignupSuccess }) {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
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
      await api.post("/user/signup", form);
      onSignupSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[320px]">
      <h2 className="text-3xl font-bold text-gray-800 mb-1">
        Create Account
      </h2>

      <p className="text-gray-500 mb-8">
        Fast, secure & reliable payments
      </p>

      <input
        name="username"
        placeholder="Email"
        value={form.username}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />

      <input
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />

      <input
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full mb-6 p-3 border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-600"
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
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </form>
  );
}

export default Signup;

