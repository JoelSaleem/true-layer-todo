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

export default ({
  name,
  description,
  id,
  rerender,
  events,
  disabled,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const onTodoUpdated = (todo) => {
    const updatedTodo = updateTodoLocal({ ...todo, id })
    if (events) {
      // Publish update for replay
      const updateType = events.getTypes().UPDATE
      events.addEvent(updateType, updatedTodo)
    }
    setIsEditing(false)
    rerender()
  }

  const onTodoDeleted = () => {
    deleteTodoLocal(id)
    if (events) {
      // Publist delete for replay
      const deleteType = events.getTypes().DELETE
      events.addEvent(deleteType, id)
    }
    setIsEditing(false)
    rerender()
  }

  if (isEditing && !disabled) {
    // Show Edit form
    return (
      <>
        <TodoForm
          name={name}
          description={description}
          onSaveText='Update'
          onSave={onTodoUpdated}
        />

        <FormButtonWrapper>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>

          <Button className='delete-btn' onClick={onTodoDeleted}>
            Delete
          </Button>
        </FormButtonWrapper>
      </>
    )
  }

  // Show uneditable todo 
  return (
    <ItemCard
      className={className}
      id='list-item'
      onClick={() => {
        if (!disabled) {
          setIsEditing(true)
        }
      }}
    >
      <InfoField>Name: {name}</InfoField>
      <InfoField>Desc: {description}</InfoField>
    </ItemCard>
  )
}
