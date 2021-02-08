import { db } from '../core';
import { BookRepository } from '../repositories/book.repository';
import { Book } from '../domain';

const bookRepository = new BookRepository(db.books);

const listBooks = async (): Promise<Book[]> => {
  return bookRepository.find();
};

export default { listBooks };
