// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Image, User, Book } = initSchema(schema);

export {
  Image,
  User,
  Book
};