const { GraphQLScalarType } = require("graphql");

// Define custome Address scalar type so apollo will accept it
const Address = new GraphQLScalarType({
  name: "Address",
  description: "Address",
  parseValue(value) {
    return value;
  },
  serialize(value) {
    return value;
  },
  parseLiteral(ast) {
    return new Object(ast.value);
  }
});

// Users in-memory store, seeded with one user
const users = [
  {
    id: 1,
    name: "Tommy Bonderenka",
    email: "tommybonderenka@gmail.com",
    is_admin: false,
    type: "client",
    address: {
      state: "KS",
      zip: "66101",
      street: "643 Northrup Ave",
      city: "Kansas City",
    }
  }
];

// Create resolvers describing the queries and mutations accessible by the graph api
const resolvers = {
  Query: {
    Users: () => users,
    User: (_, { id }) =>
      users.find(user => user.id == id)
  },
  Mutation: {
    createUser: (root, args) => {
      const nextId =
        users.reduce((id, user) => {
          return Math.max(id, user.id);
        }, -1) + 1;

      if (args.type != "internal") {
        if (args.is_admin) {
          throw new Error("Only internal users can be administrators");
        }
      }
      const newUser = {
        id: nextId,
        name: args.name,
        email: args.email,
        address: args.address,
        type: args.type,
        is_admin: args.is_admin
      };
      users.push(newUser);
      return newUser;
    },
    deleteUser: (root, args) => {
      const index = users.findIndex(
        user => user.id == user.id
      );
      user = users[index];
      users.splice(index, 1);
      return user;
    },
    updateUser: (root, args) => {
      const index = users.findIndex(
        user => user.id == args.id
      );
      if (args.type != "internal") {
        if (args.is_admin) {
          throw new Error("Only internal users can be administrators");
        }
      }
      users[index].name = args.name;
      users[index].email = args.email;
      users[index].address = args.address;
      users[index].type = args.type;
      users[index].is_admin = args.is_admin;
      return users[index];
    }
  },
  Address
};

module.exports.Resolvers = resolvers;
