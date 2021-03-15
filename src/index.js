const { ApolloServer } = require('apollo-server')
const fs = require('fs');
const path = require('path');

const typeDefs = fs.readFileSync(
  path.join(__dirname, 'schema.graphql'),
  'utf8'
)

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of hackernews clone`,
    feed: () => links,
    link: (parent, { id }) => links.find(link => link.id === id),
  },
  Mutation: {
    post: (parent, { url, description }) => {
      const link = {
        id: `link-${idCount++}`,
        url,
        description,
      }
      links.push(link);
      return link;
    },
    updateLink: (parent, { id, ...rest }) => {
      let _link;
      links = links.map(link => {
        if (id === link.id) {
          _link = { ...link, ...rest };
          return _link;
        }
        return link;
      })
      return _link;
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server isd runnin on ${url}`);
  });
