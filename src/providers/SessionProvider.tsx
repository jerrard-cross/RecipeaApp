import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { AuthService } from "../stores/api/AuthService";
import { UserModel } from "../models/UserModel";
import { useUIStore } from "../stores";

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  refreshUser: (refreshToken: string) => void;
  session?: string | null;
  user?: UserModel | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  refreshUser: () => null,
  session: null,
  user: null,
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
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = React.useState<UserModel | null>(null);
  const { showToast } = useUIStore();

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string) => {
          try {
            let response = await api.loginUser(username, password);

            if (response) {
              setSession(response.accessToken);
              setUser(response);
            }
          } catch (error) {
            showToast({
              title: "Error signing in",
              status: "error",
            });
          }
        },
        refreshUser: async (refreshToken: string) => {
          try {
            let response = await api.refreshUser(refreshToken);

            if (response) {
              console.log(response);
              setSession(response.accessToken);
              setUser(response);
            }
          } catch (error) {
            showToast({
              title: "Error refreshing user",
              status: "error",
            });
            setSession(null);
            setUser(null);
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        user: user,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
