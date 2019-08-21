import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { CurrentUsers, DeleteUser, GetUser, UpdateUser, CreateUser } from './graphql';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUsers() {
    return this.apollo.watchQuery<Response>({
      query: CurrentUsers,
      fetchPolicy: 'network-only'
    })
    .valueChanges
  }

  deleteUser(userId) {
    return this.apollo.mutate({
      mutation: DeleteUser,
      variables: {
        id: userId
      }
    })
  }

  createUser(userDetails) {
    return this.apollo.mutate({
      mutation: CreateUser,
      variables: userDetails
    })
  }

  getUser(userId) {
    return this.apollo.watchQuery<Response>({
      query: GetUser,
      variables: {
        id: userId
      },
      fetchPolicy: 'network-only'
    })
    .valueChanges
  }

  updateUser(userDetails) {
    return this.apollo.mutate({
      mutation: UpdateUser,
      variables: userDetails
    })
  }
}
