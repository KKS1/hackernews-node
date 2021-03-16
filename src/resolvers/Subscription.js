const {NEW_LINK_TOPIC} = require('../utils');

const newLinkSubscribe = (parent, args, {pubsub}, info) => pubsub.asyncIterator(NEW_LINK_TOPIC);

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload,
};

module.exports = {
  newLink,
};
