"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {
  const [emailOrNumber, setEmailOrNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: emailOrNumber, password, name }),
      });

      if (response.ok) {
        router.push("/auth/signin");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred during registration.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const isInputValid = emailOrNumber.trim() !== "" && name.trim() !== "";

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="text-3xl font-bold mb-6 flex justify-center text-blue-500">
          venmo
        </div>
        <div className="text-lg mb-4 flex justify-center">Sign up</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            className="px-4 py-2 w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Enter Email or mobile number"
            className="px-4 py-2 w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={emailOrNumber}
            onChange={(e) => setEmailOrNumber(e.target.value)}
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            disabled={!isInputValid}
            className="mt-6 py-2 w-full text-lg bg-blue-500 text-white rounded-full mb-2 hover:bg-blue-600 transition-colors duration-300"
          >
            Sign up
          </button>
        </form>
        <button
          onClick={() => router.push("/auth/signin")}
          className="w-full text-lg text-blue-500 font-semibold mt-2 py-2 border-2 rounded-full border-blue-500 hover:bg-gray-100 transition-colors duration-300"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
