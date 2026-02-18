import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useBasketStore } from "../store/basketStore";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const totalItems = useBasketStore((s) => s.totalItems());

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-icons text-yellow-400">shopping_cart</span>
          <span className="font-semibold tracking-wide">Amazon Clone</span>
        </Link>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link className="text-sm hover:underline" to="/login">Login</Link>
              <Link className="text-sm hover:underline" to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <span className="hidden text-sm text-slate-200 sm:block">{user.email}</span>
              <button onClick={handleLogout} className="rounded bg-slate-700 px-3 py-1 text-sm hover:bg-slate-600">
                Logout
              </button>
            </>
          )}

          <button
            onClick={() => navigate("/checkout")}
            className="relative rounded bg-yellow-500 px-3 py-2 text-slate-900 hover:bg-yellow-400"
            title="Basket"
          >
            <span className="material-icons">shopping_basket</span>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-xs text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
