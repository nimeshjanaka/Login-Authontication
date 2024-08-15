"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (result.error) {
        setError("Invalid credentials");
        return;
      }
      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
      setError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-500">
        <h1 className="text-xl font-bold my-5">Enter the details</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border p-2 rounded-md"
          />

          <button className="bg-green-500 text-white p-2 rounded-md font-bold cursor-pointer px-4 py-2">
            Login
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit txt-sm py-2 px-4 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link href="/Register">
            Don't have an account?
            <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
