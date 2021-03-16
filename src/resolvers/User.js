const links = (parent, args, {prisma}, info) => {
  return prisma.link.findUnique({
    where: {
      id: parent.id,
    }
  }).links();
};

module.exports = {
  links,
}
