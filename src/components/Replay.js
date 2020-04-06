import React, { useState, useEffect } from 'react'
import { useInMemoryTodos } from '../utilities/todoCrud'
import { useInterval } from '../hooks/useInterval'
import TodoListItem from './TodoListItem'

export default ({ events = [], eventTypes, toggleIsPlaying }) => {
  const {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodos,
    createInitialList,
  } = useInMemoryTodos()

  const [idx, setIdx] = useState(0)
  const recordedEvents = events.sort((a, b) => {
    return a.created > b.created
  })

  useInterval(() => {
    setIdx(idx + 1)

    if (idx >= 0 && idx < events.length) {
      const currEvent = recordedEvents[idx]

      switch (currEvent.type) {
        case eventTypes.CREATE:
          createTodo(currEvent.data)
          break
        case eventTypes.UPDATE:
          updateTodo(currEvent.data)
          break
        case eventTypes.DELETE:
          deleteTodo(currEvent.data)
          break
        case eventTypes.INITIAL_LIST:
          createInitialList(currEvent.data)
          break
      }
    } else if (idx >= events.length + 2) {
      toggleIsPlaying()
    }
  }, 1000)

  const todos = Object.values(getTodos()).sort((a, b) => a.created > b.created)

  return (
    <div>
      <h3>Replay</h3>
      {todos.map(({ name, description, id }) => {
        return (
          <TodoListItem
            disabled
            name={name}
            description={description}
            key={id}
          />
        )
      })}
    </div>
  )
}
