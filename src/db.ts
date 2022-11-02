import { MongoClient } from 'mongodb';

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DBNAME,
} = process.env;

// const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;
// const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;
const MONGO_URI = `mongodb://127.0.0.1:27017/crud-api`;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
