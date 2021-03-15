const { ApolloServer } = require('apollo-server')
const { PrismaClient } = require('@prisma/client')
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8'
)

const resolvers = {
  Query: {
    info: () => `This is the API of hackernews clone`,
    feed: async (parent, args, {prisma}) => {
      return await prisma.link.findMany();
    },
    link: async (parent, { id }, { prisma }) =>
      await prisma.link.findFirst({
        where: {
          id,
        }
      }),
  },
  Mutation: {
    post: async (parent, { url, description }, {prisma}) =>
      await prisma.link.create({
        data: {
          url,
          description,
        },
      }),
    updateLink: async (parent, { id, ...rest }, {prisma}) =>
      await prisma.link.update({
        where: {
          id,
        },
        data: {
          ...rest,
        }
      }),
    deleteLink: async (parent, {id}, {prisma}) =>
      await prisma.link.delete({
        where: {
          id
        }
      }),
  },
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
