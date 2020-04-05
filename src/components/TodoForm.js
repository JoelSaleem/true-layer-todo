import React, { useState } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  background-color: transparent;
  color: ${({theme}) => theme.textColour};
  border-top: none;
  border-left: none;
  border-right: none;
  border-width: 1px;
`

export default ({
  onSave,
  onSaveText,
  name: defaultName,
  description: defaultDesc,
}) => {
  const [name, setName] = useState(defaultName || '')
  const [description, setDescription] = useState(defaultDesc || '')

  return (
    <>
      <div>name</div>
      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <div>description</div>
      <Input
        value={description}
        onChange={(e) => {
          setDescription(e.target.value)
        }}
      />
      <button
        onClick={() => {
          onSave({ name, description })
        }}
      >
        {onSaveText}
      </button>
    </>
  )
}
