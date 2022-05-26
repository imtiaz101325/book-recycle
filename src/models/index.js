// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Book } = initSchema(schema);

export {
  User,
  Book
};