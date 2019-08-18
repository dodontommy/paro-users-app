import gql from 'graphql-tag';

export const GetUser = gql`
  query User($id: ID!) {
    User(id: $id) {
      id
      name
      is_admin
      address
      type
      email
    }
  }
`;

export const CurrentUsers = gql`
  {
    Users {
      id
      name
      is_admin
      type
      email
    }
  }
`;

export const CreateUser = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $address: Address!
    $type: String!
    $is_admin: Boolean!
  ) {
    createUser(
      name: $name
      email: $email
      address: $address
      type: $type
      is_admin: $is_admin
    ) {
      id
      address
    }
  }
  `;

export const UpdateUser = gql`
  mutation updateUser(
    $id: ID!
    $name: String!
    $email: String!
    $address: Address!
    $type: String!
    $is_admin: Boolean!
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      address: $address
      type: $type
      is_admin: $is_admin
    ) {
      id
      address
    }
  }
`;

export const DeleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;
