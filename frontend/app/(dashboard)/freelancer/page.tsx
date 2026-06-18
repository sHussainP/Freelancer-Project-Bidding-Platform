"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserRoleFromStorage } from "@/lib/utils";

export default function FreelancerDashboard() {
  const router = useRouter();

  useEffect(() => {
    const userRole = getUserRoleFromStorage();

    if (!userRole) {
      localStorage.removeItem("access_token");
      router.replace("/login");
      return;
    }

    if (userRole !== "FREELANCER") {
      if (userRole === "CLIENT") {
        router.replace("/client");
      } else {
        localStorage.removeItem("access_token");
        router.replace("/login");
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.replace("/login");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10 mb-2">
            Freelancer Workspace
          </span>
          <h1 className="text-2xl font-bold text-slate-900">
            Bidding & Discovery Board
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          Log Out
        </button>
      </div>

      <div className="rounded-lg border-2 border-dashed border-slate-200 p-12 text-center">
        <span className="text-3xl block mb-2">🔍</span>
        <h3 className="text-sm font-semibold text-slate-900">
          No available projects to bid on
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Your profile metrics and the marketplace bid stream will load here.
        </p>
      </div>
    </div>
  );
}
