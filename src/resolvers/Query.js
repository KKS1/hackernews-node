const info = () => `This is the API of hackernews clone`;

const feed = async (parent, {filter}, {prisma}) => {
  let where = {};

  if(filter) {
    where = {
      OR: [
        {url: { contains: filter }},
        {description: { contains: filter }},
      ]
    }
  };

  return await prisma.link.findMany({
    where,
  });
};

const link = async (parent, { id }, { prisma }) =>
  await prisma.link.findFirst({
    where: {
      id,
    }
  });

  module.exports = {
    info,
    link,
    feed,
  }
