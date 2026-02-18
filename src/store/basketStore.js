import { create } from "zustand";

export const useBasketStore = create((set, get) => ({
  items: [],

  addToBasket: (product) => {
    const items = get().items.slice();
    const idx = items.findIndex((x) => x.id === product.id);
    if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + 1 };
    else items.push({ ...product, qty: 1 });
    set({ items });
  },

  removeOne: (id) => {
    const items = get().items.slice();
    const idx = items.findIndex((x) => x.id === id);
    if (idx === -1) return;

    if (items[idx].qty > 1) items[idx] = { ...items[idx], qty: items[idx].qty - 1 };
    else items.splice(idx, 1);

    set({ items });
  },

  deleteItem: (id) => set({ items: get().items.filter((x) => x.id !== id) }),

  clearBasket: () => set({ items: [] }),

  subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.qty, 0),

  totalItems: () => get().items.reduce((sum, item) => sum + item.qty, 0)
}));
