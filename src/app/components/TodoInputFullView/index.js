import React, { useState, useEffect } from 'react'

import { generateId } from '../../utilities/general'

import './style'

const TodoInputFullView = ({ onSubmit: onSubmitTodo, onClose, data }) => {
  const [lists, setLists] = useState([])

  const isEditMode = !!data

  const [todo, setTodo] = useState(data || {
    title: '',
    details: '',
    list: {}
  })
  let existingSubTasks = [{}]
  if (data && data.subTasks && data.subTasks.length) {
    existingSubTasks = [...data.subTasks, {}]
  }
  const [subTasks, setSubTasks] = useState(existingSubTasks)
  const [isNewListOpen, setIsNewListOpen] = useState(false) // if true, open create new list modal

  useEffect(() => {
    // fetch lists from local storage
    setLists([
      {
        id: '1',
        name: 'Grocery',
        isDefault: true
      },
      {
        id: '2',
        name: 'Work',
        isDefault: true
      },
      {
        id: '_jhsdjsjdk',
        name: 'Durga Pujo'
      }
    ])
  }, [])

  const { title, details } = todo

  const onChange = (e, type) => {
    const newTodo = { ...todo }
    if (typeof e.target.value === 'string') {
      newTodo[type] = e.target.value
      setTodo(newTodo)
    }
  }

  const updateSubTasks = (id, title) => {
    if (id) {
      setSubTasks(subTasks.map(task => {
        return (task.id === id) ? { ...task, title } : task
      }))
    } else {
      const newTasks = [...subTasks]
      newTasks[subTasks.length - 1] = {
        id: generateId(),
        title,
        createdAt: (new Date()).getTime()
      }
      newTasks.push({})
      setSubTasks(newTasks)
    }
  }

  const deleteSubTask = (id) => {
    setSubTasks(subTasks.filter(task => task.id !== id))
  }

  const selectList = (id) => {
    const list = lists.find(list => list.id === id)
    setTodo({ ...todo, list })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // title is required
    if (!title) {
      return false
    }

    // save TODO
    onSubmitTodo({
      ...todo,
      subTasks: subTasks.filter(task => task.title) // save only non-empty sub tasks
    })

    // close modal
    onClose()
  }

  const onCreateList = (name) => {
    // create new list
    const list = {
      id: generateId(),
      name
    }

    // append new list to existing collection
    setLists([...lists, list])
    setTodo({
      ...todo,
      list
    })

    // assign current task to newly created list
    setIsNewListOpen(false)
  }

  const ctaClass = 'fullview__cta' + (title ? '' : ' fullview__cta--disabled')

  return (
    <div className='fullview'>
      <h2 className='fullview__title'>{isEditMode ? 'Edit existing Task' : 'Add a new Task'}</h2>
      <form onSubmit={onSubmit}>
        <input type='text' className='fullview__input' placeholder='Title' value={title} onChange={e => onChange(e, 'title')} />
        <textarea className='fullview__details' placeholder='Details' value={details} onChange={e => onChange(e, 'details')} />

        <br /><br />

        Sub tasks:
        {subTasks.map((task, index) => <SubTaskInput key={index} data={task} onSave={updateSubTasks} onDelete={deleteSubTask} />)}

        <br /><br />

        Add to folder:
        <Lists data={lists} selected={todo.list} onChange={selectList} />
        {!isNewListOpen && <button type='button' onClick={() => setIsNewListOpen(true)}>+ New list</button>}

        <br /><br />

        <button className={ctaClass} type='submit' disabled={!title}>{isEditMode ? 'Update' : 'Save'}</button>
      </form>

      {isNewListOpen && <NewList onCreate={onCreateList} onCancel={() => setIsNewListOpen(false)} />}
    </div>
  )
}

const SubTaskInput = ({ data: { id, title = '' } = {}, onSave, onDelete }) => {
  const onChange = (e) => {
    onSave(id, e.target.value)
  }
  return (
    <div className='fullview__subtask'>
      <input type='text' className='fullview__input fullview__subtask-input' value={title} onChange={onChange} placeholder='Add a sub task' />
      <button type='button' className='fullview__subtask-del' onClick={() => onDelete(id)}>✕</button>
    </div>
  )
}

const Lists = ({ data, selected = {}, onChange: onChangeSelection }) => {
  const onChange = (e) => {
    onChangeSelection(e.target.value)
  }
  return (
    <select value={selected.id} onChange={onChange}>
      <option>Select any one!</option>
      {data.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
    </select>
  )
}

const NewList = ({ onCreate, onCancel: onCancelList }) => {
  const [name, setName] = useState('')
  const onChange = e => {
    setName(e.target.value)
  }
  const onSubmit = e => {
    e.stopPropagation()
    e.preventDefault()
    if (name) {
      onCreate(name)
      setName('')
    }
  }
  const onCancel = () => {
    onCancelList()
  }
  return (
    <form onSubmit={onSubmit}>
      <input type='text' value={name} onChange={onChange} />
      <button type='submit'>Create & add to list</button>
      <button type='button' onClick={onCancel}>Cancel</button>
    </form>
  )
}

export default TodoInputFullView
