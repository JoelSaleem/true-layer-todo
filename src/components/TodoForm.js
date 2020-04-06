import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './TemplateComponents/Button'

const Input = styled.input`
  background-color: transparent;
  color: ${({ theme }) => theme.textColour};
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
  width: 100%;
`

const Container = styled.div``

export default ({
  onSave,
  onSaveText,
  name: defaultName,
  description: defaultDesc,
}) => {
  const [name, setName] = useState(defaultName || '')
  const [description, setDescription] = useState(defaultDesc || '')

  return (
    <Container>
      <div>Name</div>
      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <div>Description</div>
      <Input
        value={description}
        onChange={(e) => {
          setDescription(e.target.value)
        }}
      />
      <div>
        <Button
          onClick={() => {
            onSave({ name, description })
          }}
        >
          {onSaveText}
        </Button>
      </div>
    </Container>
  )
}
