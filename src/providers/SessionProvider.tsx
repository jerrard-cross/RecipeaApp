import React, { useEffect } from "react";
import { useStorageState } from "../hooks/useStorageState";
import { AuthService } from "../stores/api/AuthService";
import { UserModel } from "../models/UserModel";
import { useUIStore } from "../stores";

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  refreshToken?: string | null;
  accessToken?: string | null;
  user?: UserModel | null;
  isRefreshLoading: boolean;
  isAccessLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  refreshToken: null,
  accessToken: null,
  user: null,
  isRefreshLoading: false,
  isAccessLoading: false,
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
  const [[isRefreshLoading, refreshToken], setRefreshToken] =
    useStorageState("refreshToken");
  const [[isAccessLoading, accessToken], setAccessToken] =
    useStorageState("accessToken");

  const [user, setUser] = React.useState<UserModel | null>(null);
  const { showToast } = useUIStore();

  const getUser = async (accessToken: string) => {
    try {
      let user = await api.getUser(accessToken);

      setUser(user);
    } catch (error) {
      showToast({
        title: "Error getting user",
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (refreshToken) {
      api
        .refreshUser(refreshToken)
        .then((response) => {
          if (response) {
            setRefreshToken(response.refreshToken);
            setAccessToken(response.accessToken);
            getUser(response.accessToken);
          }
        })
        .catch((error) => {
          showToast({
            title: "Error refreshing user",
            status: "error",
          });
          setRefreshToken(null);
          setAccessToken(null);
          setUser(null);
        });
    }
  }, [refreshToken]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string) => {
          try {
            let response = await api.loginUser(username, password);

            if (response) {
              setRefreshToken(response.refreshToken);
              setAccessToken(response.accessToken);
              setUser(response);
            }
          } catch (error) {
            showToast({
              title: "Error signing in",
              status: "error",
            });
          }
        },
        signOut: () => {
          setRefreshToken(null);
        },
        refreshToken,
        accessToken,
        user: user,
        isRefreshLoading,
        isAccessLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
