import { useRef, useState } from 'react'
import { getTodosLocal } from '../utilities/todoCrud'

export const useRecorder = () => {
  // State to trigger a rerender of the consumer of this hook
  const [isRecording, setIsRecording] = useState(false)

  // Reference so that the state can be queried without
  // triggering a rerender (e.g. Events.js)
  const isRecordingRef = useRef(false)

  const startRecording = () => {
    setIsRecording(true)
    isRecordingRef.current = true
  }

  const stopRecording = () => {
    setIsRecording(false)
    isRecordingRef.current = false
  }

  return { isRecordingRef, isRecording, startRecording, stopRecording }
}
