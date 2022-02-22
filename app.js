import { Command } from 'commander';
import { addNote, deleteNote, logNotes } from './notes.js';

const program = new Command();

program
  .name('node app.js')
  .description('Manage your notes!')
  .version('1.0.0');

program
  .command('add')
  .description('Add a note')
  .argument('<string>', 'Title')
  .action((str) => {
    addNote(str);
  });

program
  .command('delete')
  .description('Delete a note')
  .argument('<number>', 'id')
  .action((id) => {
    deleteNote(id);
  });

program
  .command('list')
  .description('Show all notes')
  .action(() => {
    logNotes();
  });

program.parse();
