import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TodoList from './TodoList'
import RecordingManager from './RecordingManager'
import { useRecorder } from '../hooks/useRecorder'
import Events from '../Events'
import Replay from './Replay'
import { getTodosLocal } from '../utilities/todoCrud'

export default () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const toggleIsPlaying = () => setIsPlaying(!isPlaying)

  const [
    isRecordingRef,
    isRecording,
    startRecording,
    stopRecording,
  ] = useRecorder(null)

  const [events, setEvents] = useState(null)
  useEffect(() => {
    setEvents(new Events(isRecordingRef))
  }, [])

  return (
    <div>
      <RecordingManager
        isRecording={isRecording}
        isPlaying={isPlaying}
        startRecording={() => {
          startRecording()
          events && events.clearEvents()
          const initialListType = events.getTypes().INITIAL_LIST
          events.addEvent(initialListType, getTodosLocal())
        }}
        stopRecording={() => {
          events.persist()
          stopRecording()
        }
        }
        togglePlaying={toggleIsPlaying}
      />

      {!isPlaying && <TodoList events={events} />}

      {isPlaying && (
        <Replay
          events={events && events.getEvents()}
          eventTypes={events.getTypes()}
          toggleIsPlaying={toggleIsPlaying}
        />
      )}
    </div>
  )
}
