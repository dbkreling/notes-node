console.log('Starting notes.js');

const fs = require('fs');

var addNote = (title, body) => {
    var notes = [];
    var note = {
        title,
        body
    };

    // Load the notes-data file into an array. Treat exception if ENOENT
    try {
        var notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
    } catch (e) {

    }

    // Verify for duplicate notes. If no duplicates, write to file.
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length == 0) {
        notes.push(note);
        fs.writeFileSync("notes-data.json", JSON.stringify(notes));
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
