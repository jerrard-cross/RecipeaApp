import { supabase } from "@/src/lib/supabase";
import { UserModel } from "@/src/models/UserModel";

export class AuthService {
  async loginUser(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    const { data } = await supabase
      .from("Users")
      .upsert({ email: email, last_sign_in_at: new Date().toISOString() })
      .select();

    console.log(data, "data");

    return supabase.auth.getUser();
  }
}
