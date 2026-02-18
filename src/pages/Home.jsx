import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { products as seed } from "../data/products";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setProducts(seed);
      setLoading(false);
    }, 250);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="hero-bg mb-4 rounded-lg p-5">
        <h1 className="text-2xl font-bold text-slate-900">Shop deals today</h1>
        <p className="mt-1 text-slate-700">
          Welcome to Amazon.com
        </p>
      </div>

      {loading ? (
        <div className="rounded border bg-white p-4 text-slate-600">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
