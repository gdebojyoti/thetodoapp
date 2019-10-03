import React from 'react'

const TodoItem = ({ item, onDelete }) => {
  const { id, title, category, timestamp } = item

  // generate time from timestamp (D/M)
  const date = new Date(timestamp)
  const time = `${date.getDate()}/${date.getMonth() + 1}`

  return (
    <div>
      {title} • {category} • {time} &nbsp;&nbsp;&nbsp;
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  )
}

export default TodoItem
