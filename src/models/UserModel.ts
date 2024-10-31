export class UserModel {
  Id: string;
  Name: string;
  Email: string;
  Phone: string;
  Providers: string[];
  CreatedAt: string;
  LastSignInAt: string;

  constructor(results: any = {}) {
    this.Id = results.Id;
    this.Name = results.Name;
    this.Email = results.Email;
    this.Phone = results.Phone;
    this.Providers = results.Providers;
    this.CreatedAt = results.CreatedAt;
    this.LastSignInAt = results.LastSignInAt;
  }

  static fromJson(json: any) {
    return new UserModel({
      Id: json.id,
      Name: json.name,
      Email: json.email,
      Phone: json.phone,
      Providers: json.providers,
      CreatedAt: json.created_at,
      LastSignInAt: json.last_sign_in_at,
    });
  }
}
