const postedBy = (parent, args, {prisma}, info) => {
  return prisma.link.findUnique({
    where: {
      id: parent.id,
    }
  }).postedBy();
};

module.exports = {
  postedBy,
}
