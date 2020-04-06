import { getId } from './commonUtil'
import { useState } from 'react'

// List stored in localStorage.true_layer_todos = {}
export const key = 'true_layer_todos'

// LocalStorage getters and setters
const setItemsLocalStorage = (items) => {
  localStorage.setItem(key, JSON.stringify(items))
}

const getItemsLocalStorage = () => {
  return localStorage.getItem(key)
}

// In memory
export const useInMemoryTodos = (initialList = {}) => {
  const [todos, setTodos] = useState({...initialList})

  return {
    createTodo(todo) {
      setTodos({ ...todos, [todo.id]: todo })
    },
    updateTodo(todo) {
      setTodos({ ...todos, [todo.id]: todo })
    },
    deleteTodo(id) {
      const newTodos = {...todos}
      delete newTodos[id]
      setTodos(newTodos)
    },
    getTodos() {
      return todos
    },
    createInitialList(todos) {
      return setTodos(todos)
    }
  }
}

// Create
export const createTodoLocal = ({ name, description }) => {
  return createTodo({ name, description }, getTodosLocal, setItemsLocalStorage)
}

const createTodo = ({ name, description }, getTodos, setItems) => {
  const items = getTodos()

  const id = getId()
  const item = {
    id,
    name,
    description,
    created: Date.now(),
  }
  items[id] = item

  setItems(items)
  return item
}

// Get todos
export const getTodosLocal = () => {
  return getTodos(getItemsLocalStorage, setItemsLocalStorage)
}

const getTodos = (getItems, setItems) => {
  const items = getItems()
  if (!items) {
    setItems({})
  }

  return JSON.parse(items || '{}')
}

// Get todo
export const getTodoLocal = (id) => {
  return getTodo(id, getTodosLocal)
}

const getTodo = (id, getTodos) => {
  const items = getTodos()
  return items[id]
}

// Delete
export const deleteTodoLocal = (id) => {
  return deleteTodo(id, setItemsLocalStorage, getTodosLocal)
}
const deleteTodo = (id, setItems, getTodos) => {
  let items = getTodos()
  delete items[id]
  setItems(items)

  return id
}

// Update
export const updateTodoLocal = (data) => {
  return updateTodo(data, setItemsLocalStorage, getTodosLocal)
}

const updateTodo = (data, setItems, getTodos) => {
  const id = data.id
  if (!id) {
    throw new Error('An Id for the todo must be provided')
  }
  
  const items = getTodos()
  const item = items[id]
  if (!item) {
    throw new Error('Could not find existing item to update')
  }
  const created = item.created
  
  const updatedItem = { ...item, ...data, id, created }
  items[id] = updatedItem

  setItems(items)
  return updatedItem
}
