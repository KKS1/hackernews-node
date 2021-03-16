const newLinkSubscribe = (parent, args, {pubsub}, info) => pubsub.asyncIterator('NEW_LINK');

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => payload,
};

module.exports = {
  newLink,
};
