import { UserModel } from "@/src/models/UserModel";
import { BaseService } from "./BaseService";

export class AuthService extends BaseService {
  async loginUser(
    username: string,
    password: string
  ): Promise<UserModel | null> {
    let { data } = await this.post("/auth/login", {
      username,
      password,
    });

    let user = new UserModel(data);

    return user;
  }

  async refreshUser(refreshToken: string): Promise<UserModel | null> {
    let { data } = await this.post("/auth/refresh", {
      refreshToken,
    });

    let user = new UserModel(data);

    return user;
  }

  async getUser(accessToken: string): Promise<any> {
    console.log("Getting user data...", accessToken);
    let { data } = await this.get("/auth/me");

    let user = new UserModel(data);

    return user;
  }
}
