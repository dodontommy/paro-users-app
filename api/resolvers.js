const { GraphQLScalarType } = require("graphql");

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
