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

  // Get events from localStorage
  const recordedEvents = events.sort((a, b) => {
    return a.created > b.created
  })

  useInterval(() => {
    // Increment event index
    setIdx(idx + 1)

    if (idx >= 0 && idx < events.length) {
      const currEvent = recordedEvents[idx]

      // As we increment through events, update the state
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
      // Three seconds after replay has finished, redirect to TodoList
      toggleIsPlaying()
    }
  }, 1000)

  // Get list of todos on screen
  const todosList = Object.values(getTodos())
  const orderedTodos = todosList.sort((a, b) => a.created > b.created)

  return (
    <div>
      <h3>Replay</h3>

      {orderedTodos.map(({ name, description, id }) => {
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
