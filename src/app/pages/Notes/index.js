import React, { useState, useEffect } from 'react'

import NavBar from '../../components/NavBar'
import Modal from '../../components/Modal'
import { addNote, fetchNotes } from '../../actions/note'
import { generateId } from '../../utilities/general'

import './style'

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState() // data for note that is being edited

  useEffect(() => {
    console.log('setNotes', fetchNotes())
    setNotes(fetchNotes())
  }, [])

  const onSave = (note) => {
    const timeStamp = (new Date()).getTime()
    setNotes([...notes, {
      ...note,
      id: generateId(),
      createdAt: timeStamp,
      lastUpdated: timeStamp
    }])
    addNote(note)
  }

  const editNote = (note) => {
    setData(note)
    toggleModal(true)
  }

  const toggleModal = (state) => {
    if (!state) {
      // on closing modal, reset data for edit
      setData(undefined)
    }
    setIsModalOpen(state)
  }

  return (
    <>
      <NavBar />
      <div className='home notes'>
        <h1 className='home__title'>My Notes</h1>

        <div className='notes__list'>
          {notes.map((note, index) => {
            const { title, description } = note
            return (
              <div key={index} className='note' onClick={() => editNote(note)}>
                <div className='note__title'>{title}</div>
                <div className='note__description'>{description}</div>
              </div>
            )
          })}
        </div>

        {isModalOpen && <NewNote onSave={onSave} onClose={() => toggleModal(false)} data={data} />}

        <button className='fab' onClick={() => toggleModal(true)}>+</button>
      </div>
    </>
  )
}

const NewNote = ({ onClose, onSave, data = {} }) => {
  const [title, setTitle] = useState(data.title || '')
  const [description, setDescription] = useState(data.description || '')

  const isValid = (title || description)
  const isEditing = (data.title || data.description)

  const onSaveNote = (e) => {
    e.preventDefault()

    if (isValid) {
      onSave({ title, description })
      onClose()
    }

    return false
  }

  return (
    <Modal>
      <form className='new-note' method='post' onSubmit={onSaveNote}>
        <span className='new-note__back' onClick={onClose}>Cancel</span>
        <input className='new-note__title' type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className='new-note__description' type='text' placeholder='Note' value={description} onChange={e => setDescription(e.target.value)} />
        {isValid && <button type='submit' className='new-note__cta'>Save</button>}
        {isEditing && <button type='button' className='new-note__cta'>Delete</button>}
      </form>
    </Modal>
  )
}

export default Notes
