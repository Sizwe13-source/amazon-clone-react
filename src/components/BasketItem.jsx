import { formatZAR } from "../lib/money";
import { useBasketStore } from "../store/basketStore";

export default function BasketItem({ item }) {
  const { removeOne, addToBasket, deleteItem } = useBasketStore();

  return (
    <div className="grid grid-cols-1 gap-3 rounded border bg-white p-3 shadow-sm sm:grid-cols-[110px_1fr_auto]">
      <img src={item.image} alt={item.title} className="h-24 w-full rounded object-cover sm:h-24 sm:w-28" />

      <div>
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold">{item.title}</h4>
          <div className="font-bold">{formatZAR(item.price * item.qty)}</div>
        </div>

        <p className="mt-1 text-sm text-slate-600">{item.description}</p>

        <div className="mt-2 flex items-center gap-2">
          <button onClick={() => removeOne(item.id)} className="rounded border px-2 py-1 text-sm hover:bg-slate-50" title="Remove one">
            <span className="material-icons text-base">remove</span>
          </button>

          <span className="min-w-8 text-center text-sm font-semibold">{item.qty}</span>

          <button onClick={() => addToBasket(item)} className="rounded border px-2 py-1 text-sm hover:bg-slate-50" title="Add one">
            <span className="material-icons text-base">add</span>
          </button>

          <button onClick={() => deleteItem(item.id)} className="ml-2 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">
            Remove
          </button>
        </div>
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-end">
        <span className="text-xs text-slate-500">ID: {item.id}</span>
      </div>
    </div>
  );
}
