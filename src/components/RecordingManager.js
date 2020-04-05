import React from 'react'
import { getRecordings } from '../utilities/recordings'
import Button from './TemplateComponents/Button'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  flex: 1;
`

const MenuLayout = styled.div`
  display: flex;
`

export default ({
  isRecording,
  startRecording,
  stopRecording,
  togglePlaying,
  isPlaying,
}) => {
  const recordings = getRecordings()
  const recordingsList = Object.values(recordings).sort((a, b) => {
    return a.startTime > b.startTime
  })
  return (
    <MenuLayout>
      <ButtonContainer>
        <Button onClick={startRecording} disabled={isRecording || isPlaying}>
          Start Rec
        </Button>
      </ButtonContainer>

      <ButtonContainer>
        <Button onClick={stopRecording} disabled={!isRecording}>
          Stop Rec
        </Button>
      </ButtonContainer>

      <ButtonContainer>
        <Button
          disabled={isRecording || isPlaying}
          onClick={() => togglePlaying()}
        >
          Play
        </Button>
      </ButtonContainer>
    </MenuLayout>
  )
}
