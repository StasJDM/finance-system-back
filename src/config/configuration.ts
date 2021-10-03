export default () => ({
  jwt_secret: process.env.JWT_SECRET,
  jwt_expire_time: process.env.JWT_EXPIRE_TIME,
  hash_rounds: process.env.HASH_ROUNDS,
});
