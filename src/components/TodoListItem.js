import React, { useState } from 'react'
import styled from 'styled-components'
import TodoForm from './TodoForm'
import { updateTodoLocal, deleteTodoLocal } from '../utilities/todoCrud'

const Container = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  text-overflow: ellipsis;
`

export default ({ name, description, id, rerender, events, disabled }) => {
  const [isEditing, setIsEdit] = useState(false)

  if (isEditing && !disabled) {
    return (
      <>
        <TodoForm
          name={name}
          description={description}
          onSaveText='Update'
          onSave={(todo) => {
            const updatedTodo = updateTodoLocal({ ...todo, id })

            const updateType = events && events.getTypes().UPDATE
            events && events.addEvent(updateType, updatedTodo)

            setIsEdit(false)
            rerender()
          }}
        />
        <button onClick={() => setIsEdit(false)}>Cancel</button>
        <button
          onClick={() => {
            deleteTodoLocal(id)

            const deleteType = events && events.getTypes().DELETE
            events && events.addEvent(deleteType, id)

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
    <Container
      onClick={() => {
        if (disabled) {
          return
        }
        setIsEdit(true)
      }}
    >
      <div>Name: {name}</div>
      <div>Desc: {description}</div>
    </Container>
  )
}
