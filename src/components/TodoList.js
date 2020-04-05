import React from 'react'
import { getTodosLocal, createTodoLocal } from '../utilities/todoCrud'
import TodoForm from './TodoForm'
import TodoListItem from './TodoListItem'
import useRerender from '../hooks/useRerender'

export default ({ events }) => {
  const rerender = useRerender()

  let todos = getTodosLocal()
  const todosList = Object.values(todos).sort((a, b) => {
    return a.created > b.created
  })

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
      <TodoForm
        onSave={(todo) => {
          const createdTodo = createTodoLocal(todo)

          const createType = events && events.getTypes().CREATE
          events && events.addEvent(createType, createdTodo)
          rerender()
        }}
        onSaveText='Create'
      />
    </div>
  )
}
