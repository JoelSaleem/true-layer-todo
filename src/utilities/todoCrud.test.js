import {createTodoLocal, getTodosLocal} from './todoCrud'

it('creates a todo in localStorage', () => {
  createTodoLocal({ name: 'Todo 1', description: 'Must do today' })
  console.log(getTodosLocal())
})
