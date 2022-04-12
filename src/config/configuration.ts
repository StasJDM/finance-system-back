import * as dotenv from 'dotenv';

dotenv.config();

export const jwt_secret = process.env.JWT_SECRET;
export const jwt_expire_time = process.env.JWT_EXPIRE_TIME;
export const hash_rounds = process.env.HASH_ROUNDS;
