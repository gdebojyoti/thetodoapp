import React, { useState, useEffect } from 'react'

import TodoInput from '../../components/TodoInput'
import TodoItem from '../../components/TodoItem'
import TodoInputFullView from '../../components/TodoInputFullView'
import Modal from '../../components/Modal'
import Toast from '../../components/Toast'
import { fetchTodos, addTodo, toggleTodo, starTodo, updateTodos } from '../../actions/todo'
import { generateId } from '../../utilities/general'

import '../core' // @TODO: Find a better way to include core styles in every page
import './style'

let toastTimer = null // @TODO: Use toast manager
let deletedTodo = null

const Home = () => {
  const [todos, setTodos] = useState([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false) // when true, open 'More details' (full view for adding new todo) modal
  const [editId, setEditId] = useState(null) // when true, open 'Edit Task' modal
  const [showingToast, isShowingToast] = useState(false)

  useEffect(() => {
    setTodos(fetchTodos())
  }, [])

  // adding a new todo
  const onAdd = ({ title, details, subTasks, ...rest }) => {
    const timeStamp = (new Date()).getTime()
    console.log('sdsd', (new Date()).getTime(), (new Date()).getTime())
    // construct todo object
    const todo = {
      id: generateId(),
      title,
      details,
      category: 'general',
      createdAt: timeStamp,
      lastUpdated: timeStamp,
      ...rest // required where other values (id, category, isDone, etc) already exist
    }
    if (subTasks) {
      todo.subTasks = subTasks
    }

    // update view
    setTodos([...todos, todo])

    // save to local storage
    addTodo(todo)
  }

  // updating an existing todo; also used for undoing last deleted todo
  const onUpdate = ({ id, ...rest }) => {
    // generate new list of todos
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return ({
          id,
          ...rest,
          lastUpdated: (new Date()).getTime()
        })
      } else {
        return todo
      }
    })

    // update view
    setTodos(newTodos)

    // save updated list to local storage
    updateTodos(newTodos)
  }

  // when a todo is deleted, only its reference (id & isDeleted flag) will be left in todos array
  const onDelete = (id) => {
    deletedTodo = todos.filter(todo => todo.id === id)[0]

    // generate new list of todos
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return ({
          id,
          isDeleted: true
        })
      } else {
        return todo
      }
    })

    // update view
    setTodos(newTodos)

    // save updated list to local storage
    updateTodos(newTodos)

    // show toast msg - indicating todo deletion, with an option to undo
    triggerToast()
  }

  // mark / unmark todo as done
  const onToggle = (id) => {
    let isDone
    const newTodos = todos.map(todo => {
      if (todo.id !== id) {
        return todo
      }
      isDone = !todo.isDone
      return { ...todo, isDone: !todo.isDone }
    })

    // update view
    setTodos(newTodos)

    // save to local storage
    toggleTodo(id, isDone)
  }

  // mark / unmark a todo as important
  const onToggleStar = (id) => {
    const newTodos = [...todos]
    newTodos.map(todo => {
      if (todo.id === id) {
        todo.isStarred = !todo.isStarred
      }
    })

    // update view
    setTodos(newTodos)

    // mark TODO as important
    starTodo(id)
  }

  // open 'More details' modal
  const openMoreDetails = (e) => {
    e.preventDefault()
    setIsDetailsOpen(true)
  }

  const undoDeletion = () => {
    // @TODO: Use toast manager
    // hide toast
    isShowingToast(false)

    // exit if no todo is found
    if (!deletedTodo) {
      return
    }

    // restore todo
    onUpdate(deletedTodo)

    // clear record
    deletedTodo = null
  }

  // @TODO: Use toast manager
  const triggerToast = () => {
    toastTimer && clearTimeout(toastTimer)
    isShowingToast(true)

    toastTimer = setTimeout(() => {
      isShowingToast(false)
    }, 2000)
  }

  return (
    <div className='home'>
      <h1 className='home__title'>My Tasks</h1>

      <div className='home__list'>
        {todos.filter(({ isDeleted }) => !isDeleted).map((todo, index) => {
          return <TodoItem key={index} item={todo} onToggle={onToggle} onDelete={onDelete} onToggleStar={onToggleStar} edit={setEditId} />
        })}
        {!todos.length && <div>No tasks found. Create your first one.</div>}
      </div>

      <TodoInput onAdd={onAdd} moreDetails={openMoreDetails} />

      {isDetailsOpen && <Modal onClose={() => setIsDetailsOpen(false)}><TodoInputFullView onSubmit={onAdd} onClose={() => setIsDetailsOpen(false)} /></Modal>}
      {editId && <Modal onClose={() => setEditId(null)}><TodoInputFullView data={todos.find(todo => todo.id === editId)} onSubmit={onUpdate} onClose={() => setEditId(null)} /></Modal>}

      {showingToast && <Toast text='Your task was deleted' cta='Undo' onClick={undoDeletion} />}
    </div>
  )
}

export default Home
