import { useRef, useState } from 'react'
import { getTodosLocal } from '../utilities/todoCrud'

export const useRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const isRecordingRef = useRef(false)

  const startRecording = () => {
    setIsRecording(true)
    isRecordingRef.current = true
  }
  const stopRecording = () => {
    setIsRecording(false)
    isRecordingRef.current = false
  }

  return [isRecordingRef, isRecording, startRecording, stopRecording]
}
