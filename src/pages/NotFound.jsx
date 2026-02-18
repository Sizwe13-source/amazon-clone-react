import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="text-2xl font-bold">Page not found</h2>
      <p className="mt-2 text-slate-600">That route doesn’t exist.</p>
      <Link className="mt-4 inline-block text-blue-600 hover:underline" to="/">
        Go home
      </Link>
    </div>
  );
}
