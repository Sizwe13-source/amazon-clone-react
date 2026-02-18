import { useBasketStore } from "../store/basketStore";
import { applyDiscount, formatZAR } from "../lib/money";

function Stars({ rating = 0 }) {
  const full = Math.max(0, Math.min(5, rating));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="material-icons text-base text-yellow-500">
          {i < full ? "star" : "star_border"}
        </span>
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { title, description, price, rating, image } = product;
  const addToBasket = useBasketStore((s) => s.addToBasket);

  const discountPercent = rating >= 5 ? 10 : rating >= 4 ? 5 : 0;
  const finalPrice = applyDiscount(price, discountPercent);

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md">
      <img src={image} alt={title} className="h-44 w-full rounded object-cover" loading="lazy" />

      <div className="mt-3 flex items-start justify-between gap-2">
        <h3 className="font-semibold leading-snug">{title}</h3>
        <Stars rating={rating} />
      </div>

      <p className="mt-2 text-sm text-slate-600">{description}</p>

      <div className="mt-3 flex items-end justify-between">
        <div>
          {discountPercent > 0 ? (
            <>
              <div className="text-xs text-slate-500 line-through">{formatZAR(price)}</div>
              <div className="text-lg font-bold">{formatZAR(finalPrice)}</div>
              <div className="text-xs text-green-600">{discountPercent}% off</div>
            </>
          ) : (
            <div className="text-lg font-bold">{formatZAR(price)}</div>
          )}
        </div>

        <button
          onClick={() => addToBasket(product)}
          className="rounded bg-yellow-500 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-yellow-400"
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
}
