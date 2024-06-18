"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function Password() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const identifier = searchParams.get("identifier");

  useEffect(() => {
    if (!identifier) {
      router.push("/auth/signin");
    }
  }, [identifier, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const isEmail = /\S+@\S+\.\S+/.test(identifier || "");
      const result = await signIn("credentials", {
        redirect: false,
        [isEmail ? "email" : "phone"]: identifier,
        password,
      });

      if (result?.error) {
        console.log("Sign in error:", result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const isInputValid = password.trim() !== "";

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <div className="flex text-3xl font-bold mb-6 justify-center text-blue-500">
          venmo
        </div>
        <div className="text-lg mb-4 flex justify-center">Log in</div>
        <div className="text-sm mb-2 flex justify-center items-center">
          <span>{identifier}</span>
          <a href="/auth/signin" className="ml-2 text-blue-500">
            Change
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" px-4 py-2 w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
            >
              {showPassword ? "Hide" : "show"}
            </button>
          </div>
          <div className="mb-4 text-left">
            <a href="#" className="text-sm text-blue-500">
              Forgot password?
            </a>
          </div>
          <button
            disabled={!isInputValid}
            className=" mt-6 py-2 w-full text-lg bg-blue-500 text-white rounded-full mb-2 hover:bg-blue-600 transition-colors duration-300"
          >
            Log in
          </button>
        </form>

        <button
          onClick={() => router.push("/auth/signup")}
          className="w-full text-blue-500 font-semibold mt-2 py-2 border-2 rounded-full border-blue-500 hover:bg-gray-100 transition-colors duration-300"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
