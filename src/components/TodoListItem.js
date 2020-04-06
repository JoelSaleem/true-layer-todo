import React, { useState } from 'react'
import styled from 'styled-components'
import TodoForm from './TodoForm'
import { updateTodoLocal, deleteTodoLocal } from '../utilities/todoCrud'
import ItemCard from './TemplateComponents/ItemCard'
import Button from './TemplateComponents/Button'

const InfoField = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const FormButtonWrapper = styled.div`
  padding-top: 12px;
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
        <FormButtonWrapper>
          <Button onClick={() => setIsEdit(false)}>Cancel</Button>
          <Button
            className='delete-btn'
            onClick={() => {
              deleteTodoLocal(id)

              const deleteType = events && events.getTypes().DELETE
              events && events.addEvent(deleteType, id)

              setIsEdit(false)
              rerender()
            }}
          >
            Delete
          </Button>
        </FormButtonWrapper>
      </>
    )
  }

  return (
    <ItemCard
      id='list-item'
      onClick={() => {
        if (disabled) {
          return
        }
        setIsEdit(true)
      }}
    >
      <InfoField>Name: {name}</InfoField>
      <InfoField>Desc: {description}</InfoField>
    </ItemCard>
  )
}
