import {
  createTodoLocal,
  getTodosLocal,
  updateTodoLocal,
  key,
  deleteTodoLocal
} from './todoCrud'

it('creates a todo in localStorage', () => {
  createTodoLocal({ name: 'Todo 1', description: 'Must do today' })
  const items = JSON.parse(localStorage.getItem(key))
  const list = Object.values(items)
  const createdItem = list[0]

  const id = Object.keys(items)[0]
  expect(id).not.toBeFalsy()

  // Check created item fields
  expect(createdItem.name).toBe('Todo 1')
  expect(createdItem.description).toBe('Must do today')
  expect(createdItem.created).not.toBe(undefined)
  expect(createdItem.id).toBe(id)
})

describe('get, update and delete todos', () => {
  beforeEach(() => {
    const items = JSON.stringify({
      id123: { name: 'Todo', description: 'desc', id: 'id123', created: 123 },
    })
    localStorage.setItem(key, items)
  })

  afterEach(() => {
    localStorage.removeItem(key)
  })

  it('gets todos in localStorage', () => {
    const retrievedItem = Object.values(getTodosLocal())[0]
    expect(retrievedItem.name).toBe('Todo')
    expect(retrievedItem.description).toBe('desc')
    expect(retrievedItem.created).not.toBeFalsy()
    expect(retrievedItem.id).toBe('id123')
  })

  it('updates a todo in localStorage, without updating created field', () => {
    updateTodoLocal({
      id: 'id123',
      name: 'updated name',
      description: 'updated desc',
      created: 100000,
    })
    const item = Object.values(JSON.parse(localStorage.getItem(key)))[0]

    expect(item.name).toBe('updated name')
    expect(item.description).toBe('updated desc')
    expect(item.created).toBe(123)
    expect(item.id).toBe('id123')
  })

  it("throws an error if a todo is updated that doesn't exist", () => {
    expect(() => {
      updateTodoLocal({
        id: '999',
      })
    }).toThrow(Error)
  })

  it('deletes a todo from localStorage', () => {
    let items = JSON.parse(localStorage.getItem(key))
    expect(items['id123']).not.toBeFalsy()
    
    deleteTodoLocal('id123')

    items = JSON.parse(localStorage.getItem(key))
    expect(items['id123']).toBeFalsy()

  })
})
