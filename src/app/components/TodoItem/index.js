import React from 'react'

const TodoItem = ({ item, onDelete, onToggleStar }) => {
  const { id, title, details, category, createdAt, subTasks = [], isStarred } = item

  // generate time from createdAt (D/M)
  const date = new Date(createdAt)
  const time = `${date.getDate()}/${date.getMonth() + 1}`

  return (
    <div>
      {title} {details && `• ${details}`} • {category} • {time} {!!subTasks.length && `• ${subTasks.length} task`}{subTasks.length > 1 && 's'} &nbsp;&nbsp;&nbsp;
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onToggleStar(id)}>{isStarred ? 'Unmark' : 'Mark'} as Important</button>
    </div>
  )
}

export default TodoItem
