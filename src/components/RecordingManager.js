import React from 'react'
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
        <Button disabled={isRecording} onClick={() => togglePlaying()}>
          {isPlaying ? 'Stop' : 'Play'}
        </Button>
      </ButtonContainer>
    </MenuLayout>
  )
}
