import { supabase } from "@/app/supabase/supabaseConfig";
import { SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from "@supabase/supabase-js";

export const createUser = async (credentials: SignUpWithPasswordCredentials) => {
  const response = await supabase.auth.signUp(credentials);
  if (response.error) throw response.error;
  console.log(response);
  return response.data.user;
};

export const signIn = async (credentials: SignInWithPasswordCredentials) => {
  const response = await supabase.auth.signInWithPassword(credentials);
  if (response.error) throw response.error;
  console.log(response);
  return response.data.user;
}

export const signOut = async () => {
  const response = await supabase.auth.signOut();
  if (response.error) throw response.error;
  console.log(response);
  return response;
}


export * as AuthApi from "./authApi";