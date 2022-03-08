import chalk from 'chalk';
import fs from 'fs';
import columnify from 'columnify';
import { tryParse } from './tryParse.js'

function getNotesSync() {
  const parsedFile = tryParse(JSON.parse(fs.readFileSync('./notes.json')));
  if (parsedFile) {
    return parsedFile;
  }
  return [];
}

export function addNote(note) {
  const notes = getNotesSync();
  const newNote = {
    id: notes.length + 1,
    note: note,
  };
  notes.push(newNote);
  const modifiedNotes = notes;
  fs.writeFileSync('./notes.json', JSON.stringify(modifiedNotes, null, 2));
  console.log(chalk.green.inverse('Success!'));
}

export function deleteNote(idToRemove) {
  const notes = getNotesSync();
  if (idToRemove > notes.length) {
    console.log(chalk.redBright.inverse('Wrong ID!'));
    return;
  }
  const modifiedNotes = notes.filter((note) => note.id != idToRemove);
  let i = 1;
  modifiedNotes.forEach((note) => {
    note.id = i;
    ++i;
  });
  fs.writeFileSync('./notes.json', JSON.stringify(modifiedNotes, null, 2));
}

export function logNotes() {
  const notes = getNotesSync();
  if (notes.length === 0) {
    console.log(chalk.yellow.inverse('No notes yet!'));
    return;
  }
  console.log(columnify(notes));
}
