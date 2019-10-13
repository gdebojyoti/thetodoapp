import { getValue, setValue } from '../utilities/localStorage'
import config from '../config'

// get all TODOs from database / local storage
function getAllTodos () {
  const todos = getValue('todos') || [] // retrieve from local storage
  return [...todos]
}

// save all TODOs to database / local storage
function saveTodos (todos) {
  setValue('todos', todos) // save to local storage
}

export function fetchTodos () {
  return getAllTodos()
}

export function addTodo (todo) {
  const todos = getAllTodos()
  todos.push(todo)
  saveTodos(todos)
}

// mark / unmark a todo as done
export function toggleTodo (id, isDone) {
  const todos = getAllTodos().map(todo => todo.id === id ? { ...todo, isDone } : todo)
  saveTodos(todos)
}

export function updateTodos (todos) {
  saveTodos(todos)
}

// export function deleteTodo (id) {
//   saveTodos(getAllTodos().filter(todo => todo.id !== id))
// }

// mark / unmark task as important
export function starTodo (id) {
  const todos = getAllTodos()
  todos.map(todo => {
    if (todo.id === id) {
      todo.isStarred = !todo.isStarred
    }
  })
  saveTodos(todos)
}

export function syncTodos () {
  const { email } = getValue('profile') || {}
  if (!email) {
    return
  }
  window.fetch(config.BACKEND_SERVER + '/syncTodos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      todos: getAllTodos(),
      email,
      token: getValue('token')
    })
  })
    .then(response => response.json())
    .then(json => {
      console.log('todos', json)
      // if successful, update local data
      if (typeof json.todos === 'object') {
        updateLocalTodos(json.todos)
      }
    })
    .catch(err => console.warn('err', err))
}

function updateLocalTodos (sArr) {
  if (!sArr.length) {
    return
  }

  // fetch array of todos from local storage
  const cArr = getValue('todos') || []

  // compare cArr with sArr; generate new list of todos
  cArr.forEach(todo => {
    // check for invalid todo item
    if (!todo || typeof todo !== 'object' || !todo.id) {
      return
    }

    const index = sArr.findIndex(item => item.id === todo.id)
    // if todo is new, push it to server todo array
    if (index === -1) {
      sArr.push({ ...todo })
      return
    }

    let itemInServerData = sArr[index]

    // ignore if item on server is already deleted
    if (itemInServerData.isDeleted) {
      return
    }

    // if todo has just been deleted, delete entire server item except id & isDeleted
    if (todo.isDeleted) {
      itemInServerData = {
        id: todo.id,
        isDeleted: true
      }
    }

    // if client todo is more recent, replace server todo with it
    if (!itemInServerData.lastUpdated || todo.lastUpdated > itemInServerData.lastUpdated) {
      itemInServerData = { ...todo }
    }

    // update server item details in server todos array
    sArr[index] = itemInServerData
  })

  // save updated data in local storage
  setValue('todos', sArr)
}
