const { ApolloServer } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();
const queries = require('./resolvers/Query');
const mutations = require('./resolvers/Mutation')

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8'
)

const resolvers = {
  Query: queries,
  Mutation: mutations,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  },
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server isd runnin on ${url}`);
  });
