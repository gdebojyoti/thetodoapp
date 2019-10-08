import React, { useState } from 'react'

import './style'

const TodoInput = ({ onAdd, moreDetails }) => {
  const [input, setInput] = useState('')
  const [showMore, setShowMore] = useState(false)

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

  const className = 'todo-input' + (showMore ? ' todo-input--focussed' : '')

  return (
    <div className={className}>
      <form className='todo-input__form' onSubmit={onSubmit}>
        <input
          type='text'
          id='input'
          className='todo-input__input'
          placeholder='Add a new task...'
          // autoFocus
          value={input}
          onChange={onChange}
          onFocus={e => setShowMore(true)}
          onBlur={e => setShowMore(false)}
        />
        <button type='submit' className='todo-input__cta' disabled={!input}>Save</button>
      </form>
      <a className='todo-input__trigger' onClick={moreDetails}>Tap to add more details</a>
    </div>
  )
}

export default TodoInput
