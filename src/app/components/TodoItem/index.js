import React from 'react'

import './style'

const TodoItem = ({ item, edit, onToggle: onToggleDone, onDelete, onToggleStar }) => {
  const { id, title, isDone, details, createdAt, subTasks = [], list: { name: list } = {}, isStarred } = item

  // generate time from createdAt (D/M)
  const date = new Date(createdAt)
  const time = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`

  // mark / unmark a task as done
  const onToggle = (e) => {
    e.stopPropagation()
    onToggleDone(id)
  }

  const triggerEdit = () => {
    edit(id)
  }

  const titleClass = 'todo-item__name' + (isDone ? ' todo-item__name--done' : '')

  const points = [] // list • time • subtasks count
  // list && points.push(<span>{list}</span>)
  points.push(time)
  !!subTasks.length && points.push(`${subTasks.length} task${subTasks.length > 1 ? 's' : ''}`)

  return (
    <div className='todo-item' onClick={triggerEdit}>
      <div className='todo-item__checkbox' onClick={onToggle}>
        {/* <input type='checkbox' checked={!!isDone} onChange={onToggle} /> */}
        {isDone ? '☑' : '☐'}
      </div>

      <div className='todo-item__info'>
        <div className={titleClass}>{title}</div>
        {details && <div className='todo-item__details'>{details}</div>}
        <div className='todo-item__points'>
          {list && <span className='todo-item__label'>{list}</span>}
          {list && ' • '}
          {points.join(' • ')}
        </div>
      </div>

      <div className='todo-item__controls'>
        <button onClick={e => { e.stopPropagation(); onDelete(id) }} className='todo-item__control-icon todo-item__control-icon--delete' title='Delete todo'>✖</button>
        <button onClick={e => { e.stopPropagation(); onToggleStar(id) }} className='todo-item__control-icon todo-item__star todo-item__control-icon--star' title={`${isStarred ? 'Unmark' : 'Mark'} as Important`}>{isStarred ? '★' : '☆'}</button>
      </div>
    </div>
  )
}

export default TodoItem
