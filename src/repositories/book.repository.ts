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

  findWhere(where: Partial<Book>): Promise<Book[]> {
    return this.db.find(where, {});
  }

  add(book: Book): Promise<Book> {
    return this.db.insert(book);
  }

  update(book: Book, fieldsToUpdate: Partial<Book>): Promise<void> {
    return this.db.update({ title: book.title, author: book.author }, fieldsToUpdate);
  }

}
