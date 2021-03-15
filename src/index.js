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
    // link: (parent, { id }) => links.find(link => link.id === id),
  },
  Mutation: {
    post: async (parent, { url, description }, {prisma}) => {
      const newLink = await prisma.link.create({
        data: {
          url,
          description,
        },
      });
      return newLink;
    },
    // updateLink: (parent, { id, ...rest }) => {
    //   let _link;
    //   links = links.map(link => {
    //     if (id === link.id) {
    //       _link = { ...link, ...rest };
    //       return _link;
    //     }
    //     return link;
    //   })
    //   return _link;
    // },
    // deleteLink: (parent, {id}) => {
    //   let deletedLink;
    //   links  = links.filter(link => {
    //     if(link.id === id) {
    //       deletedLink = link;
    //       return false;
    //     }
    //     return true;
    //   });
    //   return deletedLink;
    // }
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
