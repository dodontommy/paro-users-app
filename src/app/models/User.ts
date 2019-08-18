import BaseModel from './BaseModel';

export default class User extends BaseModel {
  name: string;
  email: string;
  is_admin: boolean;
  type: string;
  address: object;

  constructor() {
    super();
    this.address = new Object;
  }
}
