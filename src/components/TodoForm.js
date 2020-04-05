import React, { useState } from 'react'

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
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <div>description</div>
      <input
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
