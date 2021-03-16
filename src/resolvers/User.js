const links = (parent, args, {prisma}, info) => {
  return prisma.user.findUnique({
    where: {
      id: parent.id,
    }
  }).links();
};

module.exports = {
  links,
}
