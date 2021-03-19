const info = () => `This is the API of hackernews clone`;

const feed = async (parent, {filter, skip, take, orderBy}, {prisma}) => {
  let where = {};

  if(filter) {
    where = {
      OR: [
        {url: { contains: filter }},
        {description: { contains: filter }},
      ]
    }
  };

  const links = await prisma.link.findMany({
    where,
    skip,
    take,
    orderBy,
  });

  const count = await prisma.link.count({where});

  return {
    links,
    count,
  };
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
