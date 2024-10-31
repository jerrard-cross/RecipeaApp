import { makeAutoObservable, runInAction } from "mobx";
import { UserModel } from "../models/UserModel";
import { RootStore } from "./RootStore";
import { supabase } from "../lib/supabase";
import { AuthService } from "./api/AuthService";

const api = new AuthService();

export class AuthStore {
  root: RootStore;
  user: UserModel | null = null;

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

  setSession(session: any) {
    runInAction(() => {
      this.user = session?.user
        ? UserModel.fromJson({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata.full_name,
            phone: session.user.user_metadata.phone,
            providers: session.user.provider_type,
            created_at: session.user.created_at,
            last_sign_in_at: session.user.last_sign_in_at,
          })
        : null;
    });
  }

  async updateUserData(user: UserModel) {
    const { error } = await supabase.from("Users").upsert(user);

    if (error) {
      console.error("Error updating user data:", error.message);
    }
  }

  async signInWithEmail(email: string, password: string) {
    // Call the login method from the supabase client
    // and set the user to the result
    this.setIsLoading(true);
    const user = await api.loginUser(email, password);
    this.setIsLoading(false);
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
