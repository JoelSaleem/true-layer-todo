import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { updateTodo, deleteTodo } from '../utilities/todoCrud'

export default ({ name, description, id, rerender }) => {
  const [isEditing, setIsEdit] = useState(false)

  if (isEditing) {
    return (
      <>
        <TodoForm
          name={name}
          description={description}
          onSaveText='Update'
          onSave={(todo) => {
            updateTodo({ ...todo, id })
            setIsEdit(false)
            rerender()
          }}
        />
        <button onClick={() => setIsEdit(false)}>Cancel</button>
        <button
          onClick={() => {
            deleteTodo(id)
            setIsEdit(false)
            rerender()
          }}
        >
          Delete
        </button>
      </>
    )
  }

  return (
    <div onClick={() => setIsEdit(true)}>
      <div>Name: {name}</div>
      <div>Desc: {description}</div>
    </div>
  )
}
