import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css"; // Ensure your Tailwind styles are imported here

export const metadata: Metadata = {
  title: "Freelancer Project Bidding Platform",
  description: "Secure role-based marketplace for Clients and Freelancers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        {/* Persistent Global Navbar Shell */}
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="text-xl font-bold tracking-tight text-indigo-600"
              >
                🚀 WorkMarket
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                <Link href="#" className="hover:text-indigo-600 transition">
                  Browse Projects
                </Link>
                <Link href="#" className="hover:text-indigo-600 transition">
                  How it Works
                </Link>
              </nav>
            </div>

            {/* Public Action Placeholders */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
