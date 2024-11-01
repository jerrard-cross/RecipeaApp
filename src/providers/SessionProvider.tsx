import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { AuthService } from "../stores/api/AuthService";
import { UserModel } from "../models/UserModel";

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  session?: string;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

const api = new AuthService();
// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [session, setSession] = useStorageState("session");
  const isLoading = session === null;
  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string) => {
          let response = await api.loginUser(username, password);

          if (response) {
            setSession(response.accessToken);
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}