import { create } from "zustand";
import { supabase } from "../lib/supabase";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,

  init: async () => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.getSession();
    if (error) set({ error: error.message });
    set({ user: data?.session?.user ?? null, loading: false });

    supabase.auth.onAuthStateChange((_event, session) => {
      set({ user: session?.user ?? null });
    });
  },

  signup: async ({ email, password }) => {
    set({ error: null });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      set({ error: error.message });
      return { ok: false };
    }
    set({ user: data.user });
    return { ok: true };
  },

  login: async ({ email, password }) => {
    set({ error: null });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ error: error.message });
      return { ok: false };
    }
    set({ user: data.user });
    return { ok: true };
  },

  logout: async () => {
    set({ error: null });
    const { error } = await supabase.auth.signOut();
    if (error) set({ error: error.message });
    set({ user: null });
  }
}));
