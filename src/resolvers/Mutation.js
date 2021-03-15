const post = async (parent, { url, description }, {prisma}) =>
      await prisma.link.create({
        data: {
          url,
          description,
        },
      });

const updateLink = async (parent, { id, ...rest }, {prisma}) =>
  await prisma.link.update({
    where: {
      id,
    },
    data: {
      ...rest,
    }
  });

const deleteLink = async (parent, {id}, {prisma}) =>
  await prisma.link.delete({
    where: {
      id
    }
  });

module.exports = {
  post,
  updateLink,
  deleteLink,
}
