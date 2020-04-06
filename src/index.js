import React from 'react'
import ReactDOM from 'react-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import CoreLayout from './components/CoreLayout'
import Card from './components/TemplateComponents/Card'

const theme = {
  background: '#1e1f21',
  backgroundHighlight: '#454545',
  backgroundHighlight2: '#7d7d7d',
  backgroundHighlight3: '#bfbfbf',
  dangerColour: '#ff3030',
  textColour: 'white'
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.background};
    color: ${theme.textColour};
  }
`

const AppContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  min-width: 250px;
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Card>
            <CoreLayout />
          </Card>
        </AppContainer>
      </ThemeProvider>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
