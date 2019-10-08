import React from 'react'

import './style'

const TodoItem = ({ item, onToggle: onToggleDone, onDelete, onToggleStar }) => {
  const { id, title, isDone, details, category, createdAt, subTasks = [], list: { name: list } = {}, isStarred } = item

  // generate time from createdAt (D/M)
  const date = new Date(createdAt)
  const time = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`

  // mark / unmark a task as done
  const onToggle = () => {
    onToggleDone(id)
  }

  const titleClass = 'todo-item__name' + (isDone ? ' todo-item__name--done' : '')

  return (
    <div className='todo-item'>
      <div className='todo-item__checkbox' onClick={onToggle}>
        {/* <input type='checkbox' checked={!!isDone} onChange={onToggle} /> */}
        <span onClick={onToggle}>{isDone ? '☑' : '☐'}</span>
      </div>

      <div className='todo-item__info'>
        <div className={titleClass}>{title}</div>
        {details && <div className='todo-item__details'>{details}</div>}
        <div className='todo-item__points'>
          {category} {list && `• ${list}`} • {time} {!!subTasks.length && `• ${subTasks.length} task`}{subTasks.length > 1 && 's'}
        </div>
      </div>

      <div className='todo-item__controls'>
        <button onClick={() => onDelete(id)} className='todo-item__control-icon todo-item__control-icon--delete' title='Delete todo'>✕</button>
        <button onClick={() => onToggleStar(id)} className='todo-item__control-icon todo-item__star todo-item__control-icon--star' title={`${isStarred ? 'Unmark' : 'Mark'} as Important`}>{isStarred ? '★' : '☆'}</button>
      </div>
    </div>
  )
}

export default TodoItem
