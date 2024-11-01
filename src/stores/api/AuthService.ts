import { supabase } from "@/src/lib/supabase";
import { UserModel } from "@/src/models/UserModel";
import { BaseService, mapResponseToInstance } from "./BaseService";

export class AuthService extends BaseService {
  async loginUser(
    username: string,
    password: string
  ): Promise<UserModel | null> {
    let { data } = await this.post("/user/login", {
      username,
      password,
    });

    let user = new UserModel(data);

    return user;
  }

  async refreshUser(refreshToken: string): Promise<UserModel | null> {
    let { data } = await this.post("/user/refresh", {
      refreshToken,
    });

    let user = new UserModel(data);

    return user;
  }
}
