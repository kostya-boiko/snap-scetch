import { create } from "zustand";
import { Session } from "@supabase/supabase-js";

interface AuthStore {
  authSession: Session | null;
  isAuthReady: boolean;
  setIsAuthReady: (isReady: boolean) => void;
  setAuthSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authSession: null,
  isAuthReady: false,
  setIsAuthReady: (isReady) => set({ isAuthReady: isReady }),
  setAuthSession: (session) => set({ authSession: session }),
}));
