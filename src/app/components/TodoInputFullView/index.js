import React, { useState, useEffect } from 'react'

import { generateId } from '../../utilities/general'

const TodoInputFullView = ({ onSubmit: onSubmitTodo, onClose }) => {
  const [lists, setLists] = useState([])

  const [todo, setTodo] = useState({
    title: '',
    details: '',
    list: {}
  })
  const [subTasks, setSubTasks] = useState([])

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

  return (
    <>
      <div>Add a new Todo</div>
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Title' value={title} onChange={e => onChange(e, 'title')} />
        <textarea placeholder='Details' value={details} onChange={e => onChange(e, 'details')} />

        <br /><br />

        Sub tasks: <button type='button' onClick={addSubTask}>Add sub task</button>
        {subTasks.map(task => <SubTaskInput key={task.id} data={task} onSave={updateSubTasks} onDelete={deleteSubTask} />)}

        <br /><br />

        Add to folder:
        <Lists data={lists} selected={todo.list} onChange={selectList} />

        <br /><br />

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

export default TodoInputFullView
