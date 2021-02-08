#!/usr/bin/env node
import { actionMapper, ACTIONS, clargs } from './cli';
import { Book } from './domain';

const { _: [command], title, author, login } = clargs;

const book: Book = {
  title: title as string,
  author: author as string,
  borrowed: false,
  borrowedBy: null,
  borrowedDate: null
};

actionMapper.get(command as ACTIONS)?.(book, login);
