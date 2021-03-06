const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
// The sintax below is similar to the chain 'yargs.command().help().argv;'
// For documentation on yargs go to npm yargs search result on Google
const argv = yargs
    .usage('Usage: $0 <command> [options [name]]')
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];

if (command == 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log('ERROR: Note title already in use.');
    }
} else if (command == 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes:`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command == 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command == 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Error: Command not recognized');
    console.log('For more information run "node app.js [command] --help"');
}
