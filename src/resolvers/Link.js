const postedBy = (parent, args, {prisma}, info) => {
  return prisma.link.findUnique({
    where: {
      id: parent.id,
    }
  }).postedBy();
};

const votes = (parent, args, {prisma}, info) => {
  return prisma.link.findUnique({
    where: {
      id: parent.id,
    }
  }).votes();
};

module.exports = {
  postedBy,
  votes,
}
