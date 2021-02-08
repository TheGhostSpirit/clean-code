import bookController from '../controllers/book.controller';

export type ACTIONS = 'list' | 'borrow' | 'add' | 'return';

export const actionMapper = new Map<ACTIONS, (...args: any[]) => Promise<any>>(
  [
    ['list', async () => console.log(await bookController.listBooks())]
  ]
);
