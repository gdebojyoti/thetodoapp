import React, { useState, useEffect } from 'react'

import TodoInput from '../../components/TodoInput'
import TodoItem from '../../components/TodoItem'
import TodoInputFullView from '../../components/TodoInputFullView'
import { fetchTodos, addTodo, toggleTodo, deleteTodo, starTodo } from '../../actions/todo'
import { generateId } from '../../utilities/general'

let deletedTodo = null

const Home = () => {
  const [todos, setTodos] = useState([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false) // when true, open 'More details' (full view for adding new todo) modal
  const [showUndo, setShowUndo] = useState(false)

  useEffect(() => {
    setTodos(fetchTodos())
  }, [])

  // adding a new todo; also used for undoing last deleted todo
  const onAdd = ({ title, details, subTasks, ...rest }) => {
    // construct todo object
    const todo = {
      id: generateId(),
      title,
      details,
      category: 'general',
      createdAt: (new Date()).getTime(),
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

  const onDelete = (id) => {
    deletedTodo = todos.filter(todo => todo.id === id)[0]

    // update view
    setTodos(todos.filter(todo => todo.id !== id))

    // save to local storage
    deleteTodo(id)

    // show undo button; @TODO: to be replaced with toast
    setShowUndo(true)
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
    // hide button
    setShowUndo(false)

    // exit if no todo is found
    if (!deletedTodo) {
      return
    }

    // restore todo
    onAdd(deletedTodo)

    // clear record
    deletedTodo = null
  }

  return (
    <div>
      <TodoInput onAdd={onAdd} moreDetails={openMoreDetails} />
      <ul>
        {todos.map((todo, index) => {
          return <li key={index}><TodoItem item={todo} onToggle={onToggle} onDelete={onDelete} onToggleStar={onToggleStar} /></li>
        })}
      </ul>

      {isDetailsOpen && <TodoInputFullView onSubmit={onAdd} onClose={() => setIsDetailsOpen(false)} />}

      {showUndo && <button onClick={undoDeletion}>Undo last deleted</button>}
    </div>
  )
}

export default Home
