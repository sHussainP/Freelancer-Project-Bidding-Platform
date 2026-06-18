import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 sm:py-32">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl max-w-3xl">
        Connect with Top Talent or Find Your Next{" "}
        <span className="text-indigo-600">Freelance Venture</span>
      </h1>
      <p className="mt-6 text-lg text-slate-600 max-w-2xl">
        An asynchronous, secure project bidding ecosystem dedicated entirely to
        pairing visionary Clients with specialized Freelancers. No noise, just
        engineering milestones.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/signup"
          className="rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-indigo-500 transition"
        >
          Get Started
        </Link>
        <Link
          href="#"
          className="rounded-md border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          Explore Marketplace
        </Link>
      </div>

      {/* Structural Value Props Grid */}
      <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none max-w-md text-left">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-2xl mb-3">💼</div>
          <h3 className="text-lg font-bold text-slate-900">For Clients</h3>
          <p className="mt-2 text-sm text-slate-600">
            Post target initiatives, track budget thresholds, map essential
            requirements, and select from custom proposals.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-2xl mb-3">🛠️</div>
          <h3 className="text-lg font-bold text-slate-900">For Freelancers</h3>
          <p className="mt-2 text-sm text-slate-600">
            Bid precise project estimates, showcase your developer profile
            credentials, and stream secure messaging channels.
          </p>
        </div>
      </div>
    </div>
  );
}
