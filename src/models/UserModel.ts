export class UserModel {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;

  constructor(results: any = {}) {
    this.id = results.id;
    this.username = results.username;
    this.email = results.email;
    this.firstName = results.firstName;
    this.lastName = results.lastName;
    this.gender = results.gender;
    this.image = results.image;
    this.accessToken = results.accessToken;
    this.refreshToken = results.refresh;
  }
}
