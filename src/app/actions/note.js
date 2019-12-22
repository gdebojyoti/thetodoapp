import { getValue, setValue } from '../utilities/localStorage'

// get all notes from database / local storage
function getAllNotes () {
  const notes = getValue('notes') || [] // retrieve from local storage
  return [...notes]
}

// save all notes to database / local storage
function saveNotes (notes) {
  setValue('notes', notes) // save to local storage
}

export function fetchNotes () {
  return getAllNotes()
}

export function addNote (note) {
  const notes = getAllNotes()
  notes.push(note)
  saveNotes(notes)
}
