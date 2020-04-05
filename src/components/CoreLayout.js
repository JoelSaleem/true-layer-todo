import React from 'react'
import TodoList from './TodoList'

export default () => {
  return (
    <div>
      <button>Start Recording</button>
      <button>Stop Recording</button>
      <TodoList />
    </div>
  )
}
