import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TodoList from './TodoList'
import RecordingToolbar from './RecordingToolbar'
import { useRecorder } from '../hooks/useRecorder'
import Events from '../Events'
import Replay from './Replay'
import { getTodosLocal } from '../utilities/todoCrud'

export default () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const toggleIsPlaying = () => setIsPlaying(!isPlaying)

  // Recording state manager
  const {
    isRecordingRef,
    isRecording,
    startRecording,
    stopRecording,
  } = useRecorder()

  // Events manager for replay
  const [events, setEvents] = useState(null)
  useEffect(() => {
    setEvents(new Events(isRecordingRef))
  }, [])

  const replayScreen = (
    <Replay
      events={events && events.getEvents()}
      eventTypes={events && events.getTypes()}
      toggleIsPlaying={toggleIsPlaying}
    />
  )

  const onRecordingStarted = () => {
    startRecording()
    if (events) {
      // Publish currently on screen todos for replay
      events.clearEvents()
      const initialListType = events.getTypes().INITIAL_LIST
      events.addEvent(initialListType, getTodosLocal())
    }
  }

  const onRecordingStopped = () => {
    events.persist()
    stopRecording()
  }

  return (
    <div>
      <RecordingToolbar
        isRecording={isRecording}
        isPlaying={isPlaying}
        startRecording={onRecordingStarted}
        stopRecording={onRecordingStopped}
        togglePlaying={toggleIsPlaying}
      />

      {isPlaying ? replayScreen : <TodoList events={events} />}
    </div>
  )
}
