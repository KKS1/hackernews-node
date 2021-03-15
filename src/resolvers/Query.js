const info = () => `This is the API of hackernews clone`;

const feed = async (parent, args, {prisma}) => {
  return await prisma.link.findMany();
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
