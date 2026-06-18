"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered")) {
      setSuccess("Account built successfully! Please log in below.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Form-data serialization translation layer matching your backend requirements
    const params = new URLSearchParams();
    params.append("username", email); // Map email directly to OAuth2 username expectations
    params.append("password", password);

    try {
      const response = await api.post("/api/v1/auth/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // Save token directly to local storage context
      const { access_token } = response.data;
      const payloadSegment = access_token?.split(".")?.[1];
      if (!payloadSegment) throw new Error("Invalid access token format.");

      const base64 = payloadSegment.replace(/-/g, "+").replace(/_/g, "/");
      const padded = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        "=",
      );
      const tokenPayload = JSON.parse(atob(padded));
      const userRole = tokenPayload?.role;

      if (userRole !== "CLIENT" && userRole !== "FREELANCER") {
        throw new Error("Unsupported role in token.");
      }

      localStorage.setItem("access_token", access_token);

      // Navigate accurately based on user role assignments
      if (userRole === "CLIENT") {
        router.push("/client");
      } else if (userRole === "FREELANCER") {
        router.push("/freelancer");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.detail || "Authentication validation mismatch.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md bg-white p-8 rounded-xl border border-slate-200 shadow-sm my-12">
      <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">
        Welcome Back
      </h2>

      {success && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm p-3 rounded-md">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition disabled:opacity-50"
        >
          {loading ? "Validating Session..." : "Log In"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-slate-600">
        New to the network?{" "}
        <Link
          href="/signup"
          className="font-medium text-indigo-600 hover:underline"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
