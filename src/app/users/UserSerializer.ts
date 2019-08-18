import User from '../models/User';

export default class UserSerializer {
  fromJson(json: any): User {
    const user = new User();

    return user;
  }

  toJson(user: User): any {
    return user;
  }
}
