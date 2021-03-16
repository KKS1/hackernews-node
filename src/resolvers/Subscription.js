const {NEW_LINK, NEW_VOTE} = require('../utils');

const newLinkSubscribe = (parent, args, {pubsub}, info) => pubsub.asyncIterator(NEW_LINK);

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload,
};

const newVoteSubscribe = (parent, args, {pubsub}, info) => pubsub.asyncIterator(NEW_VOTE);

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => payload,
};

module.exports = {
  newLink,
  newVote,
};
