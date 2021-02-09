import { db } from '../src/core';
import { BookRepository } from '../src/repositories/book.repository';
import { UserRepository } from '../src/repositories/user.repository';

import bookController from '../src/controllers/book.controller';

describe('add a book', () => {

  let bookRepository = new BookRepository(db.books);
  let userRepository = new UserRepository(db.users);

  const book = {
    title: 'title4',
    author: 'author4',
    borrowed: false,
    borrowedBy: null,
    borrowedDate: null
  };

  beforeAll(() => {
    userRepository.add({ login: 'toto', role: 'Guest' });
    userRepository.add({ login: 'titi', role: 'Librarian' });
    userRepository.add({ login: 'tata', role: 'Member' });
    bookRepository.add({ ...book, title: 'title1', author: 'author1' });
    bookRepository.add({ ...book, title: 'title2', author: 'author2' });
    bookRepository.add({ ...book, title: 'title3', author: 'author3' });
  });


  it('as a librarian', async () => {
    await bookController.addBook(book, 'titi');

    expect(
      await bookRepository.findOne({ title: 'title4', author: 'author4' })
    ).not.toBe(null);
  });

});
