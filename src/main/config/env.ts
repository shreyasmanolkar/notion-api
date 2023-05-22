export default {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/notion',
  // TODO: add access and refresh tokens
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'accesstokensecret',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'refereshtokensecret',
  bcryptSalt: 10,
};
