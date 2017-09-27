console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
    // Load the notes-data file into an array. Treat exception if ENOENT
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    // Verify for duplicate notes. If no duplicates, write to file.
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length == 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    console.log('Getting all notes');
};

var getNote = (title) => {
    console.log('Getting note ', title);
    // console.log(body);
};

var removeNote = (title) => {
    console.log('Removing note: ', title);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};
