import React, { useState } from 'react'

const TodoInput = ({ onAdd, moreDetails }) => {
  const [input, setInput] = useState('')

  // on pressing 'enter' or clicking 'add' button
  const onSubmit = (e) => {
    e.preventDefault()
    if (input) {
      onAdd({ title: input }) // trigger onAdd method; save todo
      setInput('') // clear input
    }
    return false
  }

  // when user enters text
  const onChange = e => {
    setInput(e.target.value)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type='text' id='input' placeholder='Add a new todo' autoFocus value={input} onChange={onChange} />
        <button type='submit' disabled={!input}>Add</button>
      </form>
      <a href='' onClick={moreDetails}>Add more details</a>
    </>
  )
}

export default TodoInput
