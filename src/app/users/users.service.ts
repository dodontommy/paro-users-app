import UserSerializer from './UserSerializer';
import BaseModelService from '../base.service';
import User from '../models/User';
import { HttpClient } from '@angular/common/http';

export class UsersService extends BaseModelService<User> {
  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost:4000',
      'users',
      new UserSerializer());
  }
}
