const postedBy = (parent, args, {userId, prisma}, info) => {
  return prisma.link.findUnique({
    where: {
      id: parent.id,
    }
  }).postedBy();
};

module.exports = {
  postedBy,
}
