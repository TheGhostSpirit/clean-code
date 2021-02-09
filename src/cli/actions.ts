import bookController from '../controllers/book.controller';
import { Book } from '../domain';

export type ACTIONS = 'list' | 'borrow' | 'add' | 'return';

export const actionMapper = new Map<ACTIONS, (...args: any[]) => Promise<any>>(
  [
    ['list', async () => console.log(await bookController.listBooks())],
    [
      'add',
      (book: Book, login: string) => bookController.addBook(book, login)
        .then(() => console.log('Book added!'))
        .catch(err => console.error(err.message))
    ],
    [
      'return',
      (book: Book, login: string) => bookController.returnBook(book, login)
        .then(() => console.log('Book returned!'))
        .catch(err => console.error(err.message))
    ],
    [
      'borrow',
      (book: Book, login: string) => bookController.borrowBook(book, login)
        .then(() => console.log('Book borrowed!'))
        .catch(err => console.error(err.message))
    ],
  ]
);
