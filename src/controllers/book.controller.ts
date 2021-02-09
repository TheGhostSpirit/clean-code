import { db } from '../core';
import { Book } from '../domain';
import { BookRepository } from '../repositories/book.repository';
import { UserRepository } from '../repositories/user.repository';

const bookRepository = new BookRepository(db.books);
const userRepository = new UserRepository(db.users);

const listBooks = async (): Promise<Partial<Book>[]> => {
  return bookRepository.find().then(res => res.map(o => ({ title: o.title, author: o.author })));
};

const borrowBook = async (book: Book, login: string): Promise<void> => {
  const user = await userRepository.findOne(login);

  if (!user || user.role === 'Guest') {
    throw Error('Invalid operation for current user');
  }

  const borrowedBooks = await bookRepository.findWhere({ borrowedBy: login });

  if (borrowedBooks.length >= 3) {
    throw Error('Too many borrowed books');
  }

  const dbBook = await bookRepository.findOne(book);

  if (!dbBook || dbBook.borrowed) {
    throw Error('Book already borrowed');
  }

  return bookRepository.update(book, { borrowed: true, borrowedBy: login, borrowedDate: new Date() });
};

const returnBook = async (book: Book, login: string): Promise<void> => {
  const user = await userRepository.findOne(login);

  if (!user || user.role === 'Guest') {
    throw Error('Invalid operation for current user');
  }

  const dbBook = await bookRepository.findOne(book);

  if (!dbBook || !dbBook.borrowed) {
    throw Error('Book is not borrowed');
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

export default { addBook, borrowBook, listBooks, returnBook };
