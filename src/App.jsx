import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/authStore";

export default function App() {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

