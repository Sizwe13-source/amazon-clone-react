import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const { login, error } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState("");

  const validate = () => {
    if (!email.includes("@")) return "Enter a valid email address.";
    if (!password) return "Enter your password.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    const msg = validate();
    if (msg) return setLocalError(msg);

    setBusy(true);
    const res = await login({ email, password });
    setBusy(false);

    if (res.ok) navigate("/");
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h2 className="text-2xl font-bold">Welcome back</h2>
      <p className="mt-1 text-sm text-slate-600">Login to continue</p>

      <form onSubmit={handleSubmit} className="mt-4 rounded-lg border bg-white p-4 shadow-sm">
        <label className="block text-sm font-semibold">Email</label>
        <input className="mt-1 w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

        <label className="mt-3 block text-sm font-semibold">Password</label>
        <input type="password" className="mt-1 w-full rounded border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />

        {(localError || error) && (
          <div className="mt-3 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
            {localError || error}
          </div>
        )}

        <button disabled={busy} className="mt-4 w-full rounded bg-yellow-500 px-3 py-2 font-semibold text-slate-900 hover:bg-yellow-400 disabled:opacity-60">
          {busy ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-sm text-slate-600">
          No account? <Link className="text-blue-600 hover:underline" to="/signup">Create one</Link>
        </p>
      </form>
    </div>
  );
}
