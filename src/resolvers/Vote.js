const link = (parent, args, {prisma}, info) => {
  return prisma.vote.findUnique({
    where: {
      id: parent.id
    }
  }).link();
};

const user = (parent, args, {prisma}, info) => {
  return prisma.vote.findUnique({
    where: {
      id: parent.id
    }
  }).user();
};

module.exports = {
  link,
  user,
};
