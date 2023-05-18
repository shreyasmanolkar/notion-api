export default {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/notion',
  jwtSecret: process.env.JWTSECRET || 'secret',
  bcryptSalt: process.env.BCRYPTSALT || 10,
};
