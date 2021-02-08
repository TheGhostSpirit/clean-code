#!/usr/bin/env node
import { actionMapper, ACTIONS, clargs } from './cli';
import { db } from './core';
import { Book } from './domain';
import { UserRepository } from './repositories/user.repository';

const userRepository = new UserRepository(db.users);

const main = async() => {
  const { _: [command], title, author, login } = clargs;

  const book: Book = {
    title: title as string,
    author: author as string,
    borrowed: false,
    borrowedBy: null,
    borrowedDate: null
  };

  const user = await userRepository.findOne(login as string);

  actionMapper.get(command as ACTIONS)?.(book, user);
};

main();
