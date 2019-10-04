import React, { useState, useEffect } from 'react'

import TodoInput from '../../components/TodoInput'
import TodoItem from '../../components/TodoItem'
import TodoInputFullView from '../../components/TodoInputFullView'
import { fetchTodos, addTodo, toggleTodo, deleteTodo, starTodo } from '../../actions/todo'
import { generateId } from '../../utilities/general'

const Home = () => {
  const [todos, setTodos] = useState([])
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false)

  useEffect(() => {
    setTodos(fetchTodos())
  }, [])

  // adding a new todo
  const onAdd = ({ title, details, subTasks }) => {
    // construct todo object
    const todo = {
      id: generateId(),
      title,
      details,
      category: 'general',
      createdAt: (new Date()).getTime()
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
    // update view
    setTodos(todos.filter(todo => todo.id !== id))

    // save to local storage
    deleteTodo(id)
  }

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

  const openMoreDetails = (e) => {
    e.preventDefault()
    setIsMoreDetailsModalOpen(true)
  }

  return (
    <div>
      <TodoInput onAdd={onAdd} moreDetails={openMoreDetails} />
      <ul>
        {todos.map((todo, index) => {
          return <li key={index}><TodoItem item={todo} onToggle={onToggle} onDelete={onDelete} onToggleStar={onToggleStar} /></li>
        })}
      </ul>

      {isMoreDetailsModalOpen && <TodoInputFullView onSubmit={onAdd} onClose={() => setIsMoreDetailsModalOpen(false)} />}
    </div>
  )
}

export default Home
