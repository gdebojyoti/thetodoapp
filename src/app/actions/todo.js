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

export function updateTodo (todo) {
  const todos = getAllTodos()
  saveTodos(todos)
}

export function deleteTodo (id) {
  saveTodos(getAllTodos().filter(todo => todo.id !== id))
}
