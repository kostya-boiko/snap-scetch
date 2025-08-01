import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import AppRouter from "./app/router";
import { supabase } from "./app/supabase/supabaseConfig";
import { useAuthStore } from "./features/auth/store/authStore";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  const setAuthSession = useAuthStore(state => state.setAuthSession);
  const setIsAuthReady = useAuthStore(state => state.setIsAuthReady);
  const isAuthReady = useAuthStore(state => state.isAuthReady);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
      setAuthSession(session);
      setIsAuthReady(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!isAuthReady) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  );
}
