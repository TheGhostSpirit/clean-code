import { Database } from '../core/database';

import { Repository } from './repository';
import { Book } from '../domain';

export class BookRepository implements Repository<Book> {

  constructor(private db: Database<Book>) {}

  find(): Promise<Book[]> {
    return this.db.find({}, {});
  }

  findOne(book: Partial<Book>): Promise<Book | null> {
    return this.db.findOne(book, {});
  }

  add(book: Book): Promise<Book> {
    return this.db.insert(book);
  }

}
