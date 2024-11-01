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

  async updateUserData(user: UserModel) {
    const { error } = await supabase.from("Users").upsert(user);

    if (error) {
      console.error("Error updating user data:", error.message);
    }
  }
}
