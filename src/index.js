import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import CoreLayout from './components/CoreLayout'
import Card from './components/TemplateComponents/Card'

const theme = {
  background: '#1e1f21',
  backgroundHighlight: '#454545',
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.background};
    color: white;
  }
`

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Card>
          <CoreLayout />
        </Card>
      </ThemeProvider>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
