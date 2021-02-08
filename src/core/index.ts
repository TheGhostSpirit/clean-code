import Datastore from 'nedb';
import path from 'path';

import { Database } from './database';
import { Book, User } from '../domain';

export const db = {
  users: new Database(
    new Datastore<User>({ filename: path.resolve(__dirname, '../users.db'), autoload: true })
  ),
  books: new Database(
    new Datastore<Book>({ filename: path.resolve(__dirname, '../books.db'), autoload: true })
  )
};
