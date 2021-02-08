import { db } from '../core';
import { Book } from '../domain';
import { BookRepository } from '../repositories/book.repository';
import { UserRepository } from '../repositories/user.repository';

const bookRepository = new BookRepository(db.books);
const userRepository = new UserRepository(db.users);

const listBooks = async (): Promise<Partial<Book>[]> => {
  return bookRepository.find().then(res => res.map(o => ({ title: o.title, author: o.author })));
};

// const borrowBook = async (book: Book, login: string): Promise<Book[]> => {
//   return bookRepository.find();
// };

const returnBook = async (book: Book, login: string): Promise<void> => {
  const user = await userRepository.findOne(login);

  if (!user || user.role === 'Guest') {
    throw Error('Invalid operation for current user');
  }

  return bookRepository.update(book, { borrowed: false, borrowedBy: null, borrowedDate: null });
};

const addBook = async (book: Book, login: string): Promise<Book> => {
  const user = await userRepository.findOne(login);

  if (!user || user.role !== 'Librarian') {
    throw Error('Invalid operation for current user');
  }

  return bookRepository.add(book);
};

export default { addBook, listBooks, returnBook };
