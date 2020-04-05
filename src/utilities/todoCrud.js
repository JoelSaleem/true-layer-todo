import { getId } from './commonUtil'

// List stored in localStorage.true_layer_todos = {}
const key = 'true_layer_todos'

const setItems = (items) => {
  localStorage.setItem(key, JSON.stringify(items))
}

export const createTodo = ({ name, description }) => {
  const items = getTodos()

  const id = getId()
  items[id] = {
    id,
    name,
    description,
    created: Date.now(),
  }

  setItems(items)
}

export const getTodos = () => {
  const items = localStorage.getItem(key)
  if (!items) {
    setItems({})
  }

  return JSON.parse(items || '{}')
}

export const getTodo = (id) => {
  const items = getTodos()
  return items[id]
}

export const deleteTodo = (id) => {
  let items = getTodos()
  delete items[id]
  setItems(items)
}

export const updateTodo = (data) => {
  const id = data.id
  const created = data.created
  if (!id) {
    throw new Error('An Id for the todo must be provided')
  }

  const items = getTodos()
  const item = items[id]
  if (!item) {
    throw new Error('Could not find existing item to update')
  }

  items[id] = { ...item, ...data, id, created }

  setItems(items)
}
