import React, { useState, useEffect } from 'react'

import TodoInput from '../../components/TodoInput'
import TodoItem from '../../components/TodoItem'
import { fetchTodos, addTodo, deleteTodo } from '../../actions/todo'

const Home = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    setTodos(fetchTodos())
  }, [])

  // adding a new todo
  const onAdd = (title) => {
    const timestamp = (new Date()).getTime()
    // construct todo object
    const todo = {
      id: `_lcl_${timestamp}`,
      title,
      category: 'general',
      timestamp
    }

    // update view
    setTodos([...todos, todo])

    // save to local storage
    addTodo(todo)
  }

  const onDelete = (id) => {
    // update view
    setTodos(todos.filter(todo => todo.id !== id))

    // save to local storage
    deleteTodo(id)
  }

  return (
    <div>
      <TodoInput onAdd={onAdd} />
      <ul>
        {todos.map((todo, index) => {
          return <li key={index}><TodoItem item={todo} onDelete={onDelete} /></li>
        })}
      </ul>
    </div>
  )
}

export default Home
