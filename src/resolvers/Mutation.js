const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {APP_SECRET, getUserId} = require('../utils');

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

const signup = async (parent, args, {primsa}, info) => {
  const password = await bycrypt.hash(args.password, 10);

  const user = primsa.user.create({
    data: {
      ...args,
      password,
    }
  });

  const token = jwt.sign({userId: user.id}, APP_SECRET);

  return {
    token,
    user,
  };
};

const login = async (parent, args, {primsa}, info) => {
  const user = await prisma.user.findUnique({
    where: {
      email: args.email
    }
  });

  if(!user) {
    throw new Error('No such user found')
  }

  const valid = await bycrypt.compare(args.password, user.password);

  if(!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({userId: user.id}, APP_SECRET);

  return {
    token,
    user,
  }
};

module.exports = {
  post,
  updateLink,
  deleteLink,
  signup,
  login,
};
