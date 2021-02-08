import yargs from 'yargs/yargs';

export const clargs = yargs(process.argv.slice(2))
  .usage('Usage: $0 <command> [options]')
  .command('list', 'List the books in the library')
  .command('borrow <title> <author>', 'Borrows a book from the library')
  .command('return <title> <author>', 'Returns a book to the library')
  .command('add <title> <author>', 'Adds a new book to the library')
  .alias('l', 'login')
  .nargs('l', 1)
  .describe('l', 'User login')
  .demandCommand(1, 1, 'You must enter a command', 'Too many commands')
  .demandOption([ 'l' ])
  .help('h')
  .alias('h', 'help')
  .argv;
