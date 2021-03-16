const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {APP_SECRET, NEW_LINK, NEW_VOTE, getUserId} = require('../utils');

const post = async (parent, { url, description }, {prisma, userId, pubsub}, info) => {
  const newLink = await prisma.link.create({
    data: {
      url,
      description,
      postedBy: {connect: {id: userId}},
    },
  });

  pubsub.publish(NEW_LINK, newLink);

  return newLink;
};

const updateLink = async (parent, { id, ...rest }, {prisma, userId}, info) =>
  await prisma.link.update({
    where: {
      id,
    },
    data: {
      ...rest,
    }
  });

const deleteLink = async (parent, {id}, {prisma}, info) =>
  await prisma.link.delete({
    where: {
      id
    }
  });

const signup = async (parent, args, {prisma}, info) => {
  const password = await bycrypt.hash(args.password, 10);

  const user = await prisma.user.create({
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

const login = async (parent, args, {prisma}, info) => {
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

const vote = async (parent, {linkId}, context, info) => {
  const userId =  getUserId(context);
  const {prisma, pubsub} = context;

  const vote = await prisma.vote.findUnique({
    where:{
      linkId_userId: {
        linkId,
        userId,
      }
    }
  });

  if(Boolean(vote)) {
    throw new Error(`Already voted for link: ${linkId}`)
  }

  const newVote = await prisma.vote.create({
    data: {
      user: {connect: {id: userId}},
      link: {connect: {id: linkId}},
    }
  });

  pubsub.publish(NEW_VOTE, newVote)

  return newVote;
};

module.exports = {
  post,
  updateLink,
  deleteLink,
  signup,
  login,
  vote,
};
