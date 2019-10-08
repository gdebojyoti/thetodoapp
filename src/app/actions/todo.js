import { getValue, setValue } from '../utilities/localStorage'

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

export function updateTodo (todos) {
  saveTodos(todos)
}

export function deleteTodo (id) {
  saveTodos(getAllTodos().filter(todo => todo.id !== id))
}

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
