import React from 'react'

const TodoItem = ({ item, onToggle: onToggleDone, onDelete, onToggleStar }) => {
  const { id, title, isDone, details, category, createdAt, subTasks = [], list: { name: list } = {}, isStarred } = item

  // generate time from createdAt (D/M)
  const date = new Date(createdAt)
  const time = `${date.getDate()}/${date.getMonth() + 1}`

  // mark / unmark a task as done
  const onToggle = () => {
    onToggleDone(id)
  }

  return (
    <div>
      <input type='checkbox' checked={!!isDone} onChange={onToggle} /> &nbsp;
      {title} {details && `• ${details}`} • {category} • {time} {!!subTasks.length && `• ${subTasks.length} task`}{subTasks.length > 1 && 's'} {list && `• tagged with ${list}`} &nbsp;&nbsp;&nbsp;
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onToggleStar(id)}>{isStarred ? 'Unmark' : 'Mark'} as Important</button>
    </div>
  )
}

export default TodoItem
