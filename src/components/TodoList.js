import React from 'react'
import { getTodosLocal, createTodoLocal } from '../utilities/todoCrud'
import TodoForm from './TodoForm'
import TodoListItem from './TodoListItem'
import useRerender from '../hooks/useRerender'

export default ({ events }) => {
  const rerender = useRerender()

  // Get todos from localStorage
  let todos = getTodosLocal()
  const todosList = Object.values(todos).sort((a, b) => {
    return a.created > b.created
  })

  const onCreateTodo = (todo) => {
    const createdTodo = createTodoLocal(todo)

    if (events) {
      // Publish create for replay
      const createType = events.getTypes().CREATE
      events.addEvent(createType, createdTodo)
    }
    rerender()
  }

  return (
    <div>
      <h3>Todos list</h3>

      {todosList.map((todo) => {
        return (
          <TodoListItem
            rerender={rerender}
            key={todo.id}
            {...todo}
            events={events}
          />
        )
      })}

      <TodoForm onSave={onCreateTodo} onSaveText='Create' />
    </div>
  )
}
