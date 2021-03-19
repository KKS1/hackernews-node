const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.APP_SECRET;
const NEW_LINK = 'NEW_LINK';
const NEW_VOTE = 'NEW_VOTE';

const getTokenPayload = (token) => jwt.verify(token, APP_SECRET);

const getUserId = (req, authToken) => {
  if(req) {
    const authHeader = req.headers.authorization;
    if(authHeader){
      const token = authHeader.replace('Bearer ', '');
      if(!token) {
        throw new Error('No token found');
      }
      const {userId} = getTokenPayload(token);
      return userId;
    }
  } else if(authToken){
    const {userId} = getTokenPayload(authToken);
    return userId;
  }
  throw new Error('Not authenticated');
};

module.exports = {
  APP_SECRET,
  NEW_LINK,
  NEW_VOTE,
  getUserId,
}
