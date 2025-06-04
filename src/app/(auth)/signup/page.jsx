"use client";
import React, { useState } from "react";
import { RegisterUser } from "../../utils/userActions";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validate = () => {
    const { username, email, password } = userData;
    if (!username.trim() || !email.trim() || !password.trim()) {
      return "All fields are required.";
    }
    if (username.trim().length < 3) {
      return "Username must be at least 3 characters.";
    }
    if (username.trim().length > 20) {
      return "Username must be less than 20 characters.";
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (password.length > 32) {
      return "Password must be less than 32 characters.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    try {
      const res = await RegisterUser(userData);
      if (res.success) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError(res.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("Error during signup. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-full mt-20 ">
        <h1 className="text-3xl font-bold mb-4">Signup</h1>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center mb-2">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm text-center mb-2">
              {success}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              type="text"
              id="username"
              className="border border-gray-300 p-2 w-full rounded"
              required
              maxLength={20}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              type="email"
              id="email"
              className="border border-gray-300 p-2 w-full rounded"
              required
              maxLength={50}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              type="password"
              id="password"
              className="border border-gray-300 p-2 w-full rounded"
              required
              maxLength={32}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white py-2 px-4 rounded w-full transition duration-200
    ${loading ? "bg-blue-300 cursor-not-allowed" : "hover:bg-blue-600"}
  `}
          >
            {loading ? "Signing Up..." : "Signup"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
