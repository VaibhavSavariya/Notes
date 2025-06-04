"use client";
import Link from "next/link";
import { loginUser } from "../../utils/userActions";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Use onSubmit instead of action
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const result = await loginUser(formData);
    setLoading(false);
    if (result.success) {
      window.location.href = result.redirectTo;
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <form
        className="p-8 rounded-lg flex flex-col gap-6 min-w-[320px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center m-0 text-2xl font-semibold text-gray-800">
          Sign In
        </h2>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <label className="flex flex-col gap-1 text-gray-700">
          Email
          <input
            name="email"
            type="email"
            required
            className="p-2 rounded border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
        <label className="flex flex-col gap-1 text-gray-700">
          Password
          <input
            name="password"
            type="password"
            required
            className="p-2 rounded border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
        <button
          disabled={loading}
          className={`py-3 rounded font-bold text-base mt-2 transition-colors
    ${
      loading
        ? "bg-blue-300 text-white cursor-not-allowed"
        : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
    }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div className="text-center mt-2 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
