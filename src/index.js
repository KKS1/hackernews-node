const { ApolloServer } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const {getUserId} = require('./utils');

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8'
)

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({
    ...req,
    prisma,
    userId:
      req && req.headers.authorization
        ? getUserId(req)
        : null,
  }),
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server isd runnin on ${url}`);
  });
