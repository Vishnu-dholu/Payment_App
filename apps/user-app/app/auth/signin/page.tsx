"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignIn() {
  const [emailOrNumber, setEmailOrNumber] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedIdentifier = encodeURIComponent(emailOrNumber);
    router.push(`/auth/password?identifier=${encodedIdentifier}`);
  };

  const isInputValid = emailOrNumber.trim() !== "";

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="text-3xl font-bold mb-6 flex justify-center text-blue-500">
          venmo
        </div>
        <div className="text-lg mb-4 flex justify-center">Log in</div>
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
          <button
            disabled={!isInputValid}
            className="mt-6 py-2 w-full text-lg bg-blue-500 text-white rounded-full mb-2 hover:bg-blue-600 transition-colors duration-300"
          >
            Next
          </button>
        </form>
        <button
          onClick={() => router.push("/auth/signup")}
          className="w-full text-lg text-blue-500 font-semibold mt-2 py-2 border-2 rounded-full border-blue-500 hover:bg-gray-100 transition-colors duration-300"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
