const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const path = require('path');

const typeDefs = require('./schema').Schema;
const resolvers = require('./resolvers').Resolvers;

// Create the schema to define my graphql endpoint
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: {
    log: e => console.log(e)
  }
});

var app = express();

app.use(cors());

app.use(express.static('/app/dist/users-app'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Start the graphql API
app.use(
  '/graphql',
  graphqlHTTP(request => ({
    schema: schema,
    graphiql: true
  }))
);

app.get('/*', function(req,res) {
  res.sendFile(path.join('/dist/users-app/index.html'));
});

app.listen(process.env.PORT || 4000);

console.log('Running a GraphQL API server');
