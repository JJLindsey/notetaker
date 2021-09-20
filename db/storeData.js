const fs = require('fs');
const { uniqid } = require('uniqid');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    readNotes() {
        return readFileAsync("db/db.json", "utf8")
    }

    createNotes(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    getNotes() {
        return this.readNotes()
            .then((notes) => {
                let notesArray
                try {
                    notesArray = [].concat(JSON.parse(notes))
                } catch (error) {
                    notesArray = []
                }
                return notesArray;
            })
    }
    addNotes(note) {
        const { title, text } = note
        if (!title || !text) {
            throw new Error('Required: Title & Text')
        }
        const newNote = { title, text, id: uuidv4() }
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updateNotes) => this.createNotes(updateNotes))
            .then(() => newNote)
    }

    deleteNotes(id) {
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.createNotes(filteredNotes))
    }
}

module.exports = new Notes();