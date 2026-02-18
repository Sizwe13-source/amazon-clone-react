import { Link } from "react-router-dom";

const topLinks = [
  {
    title: "Get to Know Us",
    links: ["Careers", "Legal Notice", "Welcome to Amazon.co.za"]
  },
  {
    title: "Make Money with Us",
    links: ["Advertise Your Products", "Sell on Amazon", "Supply to Amazon"]
  },
  {
    title: "Amazon Payment Methods",
    links: ["Payment Methods Help"]
  },
  {
    title: "Let Us Help You",
    links: [
      "Track Packages or View Orders",
      "Shipping & Delivery",
      "Returns & Replacements",
      "Recalls and Product Safety Alerts",
      "Customer Service",
      "Amazon Mobile App"
    ]
  }
];

const bottomGrid = [
  { title: "Amazon Advertising", desc: "Find, attract, and engage customers" },
  { title: "Kindle Direct Publishing", desc: "Indie Digital & Print Publishing Made Easy" },
  { title: "IMDb", desc: "Movies, TV & Celebrities" },
  { title: "Goodreads", desc: "Book reviews & recommendations" },
  { title: "Amazon Web Services", desc: "Scalable Cloud Computing Services" }
];

export default function Footer() {
  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="mt-10">
      {/* Back to top */}
      <button
        onClick={goTop}
        className="w-full bg-slate-700 py-3 text-center text-sm font-semibold text-white hover:bg-slate-600"
      >
        Back to top
      </button>

      {/* Main footer section */}
      <div className="bg-slate-900 text-slate-100">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {topLinks.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-base font-bold">{col.title}</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {col.links.map((item) => (
                  <li key={item} className="cursor-pointer hover:underline">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle strip */}
        <div className="border-t border-slate-700">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4 px-6 py-6">
            <div className="text-2xl font-bold tracking-wide">
              amazon<span className="text-yellow-400">.</span>
            </div>

            <button className="rounded border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800">
              🇿🇦 South Africa
            </button>
          </div>
        </div>

        {/* Bottom grid */}
        <div className="bg-slate-950">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-2 lg:grid-cols-5">
            {bottomGrid.map((x) => (
              <div key={x.title}>
                <div className="text-sm font-semibold text-slate-100">{x.title}</div>
                <div className="mt-1 text-xs text-slate-400">{x.desc}</div>
              </div>
            ))}
          </div>

          {/* Final links */}
          <div className="border-t border-slate-800 px-6 py-6 text-center text-xs text-slate-400">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="hover:underline">Conditions of Use & Sale</span>
              <span className="hover:underline">Privacy Notice</span>
              <span className="hover:underline">Cookies Notice</span>
              <span className="hover:underline">Legal Notice</span>
              <span className="hover:underline">Interest-Based Ads Notice</span>
            </div>

            <div className="mt-2">
              © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
            </div>

            {/* Optional: link back home */}
            <div className="mt-2">
              <Link to="/" className="text-slate-300 hover:underline">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
