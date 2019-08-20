const schema = `
  scalar Address

  type User {
    id: ID!
    name: String!
    email: String!
    address: Address
    type: String!
    is_admin: Boolean
  }

  type Query {
    # Return a User by id
    User(id: ID!): User
    # Return all users
    Users(limit: Int): [User]
  }

  type Mutation {
    # Create a user
    createUser (name: String, email: String, address: Address, type: String, is_admin: Boolean): User
    # Update a user
    updateUser (id: ID!, name: String, email: String, address: Address, type: String, is_admin: Boolean): User
    # Delete a user
    deleteUser(id: ID!): User
  }
`
module.exports.Schema = schema;
