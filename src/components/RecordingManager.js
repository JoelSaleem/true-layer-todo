import React from 'react'
import { getRecordings } from '../utilities/recordings'
import { useRecorder } from '../hooks/useRecorder'

export default ({ isRecording, startRecording, stopRecording, togglePlaying, isPlaying }) => {
  const recordings = getRecordings()
  const recordingsList = Object.values(recordings).sort((a, b) => {
    return a.startTime > b.startTime
  })
  return (
    <>
      <button onClick={startRecording} disabled={isRecording || isPlaying}>
        Start Rec
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Rec
      </button>
      <button disabled={isRecording || isPlaying} onClick={() => togglePlaying()}>
        Play
      </button>
    </>
  )
}
