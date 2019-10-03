import React, { useState } from 'react'

const TodoInput = ({ onAdd }) => {
  const [input, setInput] = useState('')

  // on pressing 'enter' or clicking 'add' button
  const onSubmit = (e) => {
    e.preventDefault()
    if (input) {
      onAdd(input) // trigger onAdd method
      setInput('') // clear input
    }
    return false
  }

  // when user enters text
  const onChange = e => {
    setInput(e.target.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <input type='text' id='input' placeholder='Add a new todo' autoFocus onChange={onChange} value={input} />
      <button type='submit'>Add</button>
    </form>
  )
}

export default TodoInput
