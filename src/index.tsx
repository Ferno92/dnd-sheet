import React, {createContext, useState} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { useMediaQuery } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import {darkPalette, palette, Theme} from './assets/styles/ThemeLight'

export const ThemeContext = createContext({
  mode: 'light',
  setMode: (mode:string) => {}
})

const Index = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [theme, setTheme] = useState(sessionStorage.getItem('theme'))
  const preferredTheme = React.useMemo(
    () =>
    prefersDarkMode ? Theme(darkPalette) : Theme(palette),
    [prefersDarkMode],
  )

  const toggleTheme = (mode:string) => {
    sessionStorage.setItem('theme', mode)
    setTheme(mode)
  }

  return (
    <MuiThemeProvider theme={theme === undefined ? preferredTheme : theme === 'light' ? Theme(palette) : Theme(darkPalette)}>
      <ThemeContext.Provider
      value={{
        mode: theme != undefined ? theme : '',
        setMode: mode => toggleTheme(mode)
      }}
      >
        <App/>
      </ThemeContext.Provider>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: registration => {
    const waitingServiceWorker = registration.waiting

    if (waitingServiceWorker) {
      window.addEventListener('message', (event: MessageEvent) => {
        if (
          event.data &&
          event.data.type === 'SKIP_WAITING' &&
          navigator.serviceWorker.controller
        ) {
          waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' })
        }
      })
    }
  }
})
