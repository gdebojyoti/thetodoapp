import React, { useState } from 'react'

import { generateId } from '../../utilities/general'

const TodoInputFullView = ({ onSubmit: onSubmitTodo, onClose }) => {
  const [todo, setTodo] = useState({
    title: '',
    details: ''
  })
  const [subTasks, setSubTasks] = useState([])
  const { title, details } = todo

  const onChange = (e, type) => {
    const newTodo = { ...todo }
    if (typeof e.target.value === 'string') {
      newTodo[type] = e.target.value
      setTodo(newTodo)
    }
  }

  const addSubTask = () => {
    const newTasks = [...subTasks]
    newTasks.push({
      id: generateId(),
      title: '',
      createdAt: (new Date()).getTime()
    })
    setSubTasks(newTasks)
  }

  const updateSubTasks = (id, title) => {
    setSubTasks(subTasks.map(task => {
      return (task.id === id) ? { ...task, title } : task
    }))
  }

  const deleteSubTask = (id) => {
    setSubTasks(subTasks.filter(task => task.id !== id))
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

  return (
    <>
      <div>Add a new Todo</div>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Title' value={title} onChange={e => onChange(e, 'title')} />
        <textarea placeholder='Details' value={details} onChange={e => onChange(e, 'details')} />

        <br />

        Sub tasks:
        {subTasks.map(task => <SubTaskInput key={task.id} data={task} onSave={updateSubTasks} onDelete={deleteSubTask} />)}

        <button type='button' onClick={addSubTask}>Add sub task</button>
        <button type='submit' disabled={!title}>Save</button>
      </form>
    </>
  )
}

const SubTaskInput = ({ data, onSave, onDelete }) => {
  const onChange = (e) => {
    onSave(data.id, e.target.value)
  }
  return (
    <div>
      <input type='text' value={data.title} onChange={onChange} />
      <button type='button' onClick={() => onDelete(data.id)}>Delete</button>
    </div>
  )
}

export default TodoInputFullView
