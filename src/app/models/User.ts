import BaseModel from './BaseModel';

export default class User extends BaseModel {
  UserName: string;
  UserEmail: string;
  UserIsAdmin: boolean;
  UserType: string;
  Address: object;

  constructor() {
    super();
    this.Address = new Object;
  }
}
