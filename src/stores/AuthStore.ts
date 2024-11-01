import { makeAutoObservable, reaction, runInAction } from "mobx";
import { UserModel } from "../models/UserModel";
import { RootStore } from "./RootStore";
import { supabase } from "../lib/supabase";
import { AuthService } from "./api/AuthService";
import { apiClient, getURL } from "./api/BaseService";

export const authStoreReaction = (auth: AuthStore) => {
  reaction(
    () => auth.gatewayURL,
    async (gatewayURL) => {
      apiClient.defaults.baseURL = await gatewayURL;
    }
  );
};

const api = new AuthService();

export class AuthStore {
  root: RootStore;
  user: UserModel | null = null;
  gatewayURL = getURL();

  isLoading = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  setIsLoading(loading: boolean) {
    runInAction(() => {
      this.isLoading = loading;
    });
  }

  get session() {
    return supabase.auth.getSession();
  }

  async updateUserData(user: UserModel) {
    const { error } = await supabase.from("Users").upsert(user);

    if (error) {
      console.error("Error updating user data:", error.message);
    }
  }

  async signInWithUsername(username: string, password: string) {
    // Call the login method from the supabase client
    // and set the user to the result
    try {
      this.setIsLoading(true);
      const user = await api.loginUser(username, password);

      if (user) {
        this.setSession(user);
      }

      this.setIsLoading(false);
    } catch (error) {
      throw new Error("Error signing in:");
    }
  }

  async signUpWithEmail(email: string, password: string) {
    // Call the signup method from the supabase client
    // and set the user to the result
    this.setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error signing up:", error.message);
    }
    this.setIsLoading(false);
  }

  async signOut() {
    // Call the signout method from the supabase client
    // and set the user to null
    this.setIsLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error.message);
    }
    this.setIsLoading(false);
  }
}
