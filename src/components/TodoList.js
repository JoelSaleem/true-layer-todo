import React, { useEffect, useState } from 'react'
import { getTodos, createTodo } from '../utilities/todoCrud'
import TodoForm from './TodoForm'
import TodoListItem from './TodoListItem'
import useRerender from '../hooks/useRerender'

export default () => {
  const rerender = useRerender()

  let todos = getTodos()
  const todosList = Object.values(todos).sort((a, b) => {
    return a.created > b.created
  })

  return (
    <div>
      Todos list
      {todosList.map((todo) => {
        return <TodoListItem rerender={rerender} key={todo.id} {...todo} />
      })}
      <TodoForm
        onSave={(todo) => {
          createTodo(todo)
          rerender()
        }}
        onSaveText='Create'
      />
    </div>
  )
}
