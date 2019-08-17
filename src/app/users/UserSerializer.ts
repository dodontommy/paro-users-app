import User from '../models/User';

export default class UserSerializer {
  fromJson(json: any): User {
    const user = new User();
    user.id = json._id;
    user.UserName = json.name;
    user.UserEmail = json.email;
    user.UserIsAdmin = json.is_admin;
    user.UserType = json.type;
    user.Address = json.address;

    return user;
  }

  toJson(user: User): any {
    return {
      id: user.id,
      name: user.UserName,
      email: user.UserEmail,
      is_admin: user.UserIsAdmin,
      type: user.UserType,
      address: user.Address
    };
  }
}
