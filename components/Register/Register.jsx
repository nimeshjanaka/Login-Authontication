"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const userResponse = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await userResponse.json();
      if (user) {
        setError("User already exists");
        return;
      }

      const registerResponse = await fetch("/api/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (registerResponse.ok) {
        const form = e.target;
        form.reset();
        setError("");
        router.push("/");
      } else {
        setError("User Registration Failed");
      }
    } catch (error) {
      setError(`Error during registration: ${error.message}`);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-500">
        <h1 className="text-xl font-bold my-5">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded-md"
          />
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
          <button className="bg-green-500 text-white p-2 rounded-md font-bold cursor-pointer">
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit txt-sm py-2 px-4 rounded-md mt-2">
              {error}
            </div>
          )}
          <Link href="/">Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
