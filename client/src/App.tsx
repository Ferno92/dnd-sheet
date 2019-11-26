import React, { useEffect, useState } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Sheet from './pages/sheet/Sheet'
import Dashboard from 'pages/dashboard/Dashboard'
import ThemeLight from './assets/styles/ThemeLight'
import { Typography, Button, IconButton } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import useStyles from 'App.styles'

const App: React.FC = () => {
  const [showNewVersionBanner, setShowNewVersionBanner] = useState(false)
  const styles = useStyles()

  const onNewServiceWorkerInstalled = () => {
    setShowNewVersionBanner(true)
  }

  const onRefreshToInstallNewVersion = () => {
    if (navigator.serviceWorker.controller) {
      setShowNewVersionBanner(false)

      window.postMessage({ type: 'SKIP_WAITING' }, window.location.origin)
    }
  }

  const onCloseInstallNewVersionBanner = () => {
    setShowNewVersionBanner(false)
  }

  useEffect(() => {
    window.addEventListener('sw-installed', onNewServiceWorkerInstalled, false)

    return () => {
      window.removeEventListener('sw-installed', onNewServiceWorkerInstalled)
    }
  }, [])
  return (
    <MuiThemeProvider theme={ThemeLight}>
      {/* <BottomAppBar
              logged={this.state.logged}
              logout={this.logout}
              navigationMenuOpen={false}
              logoutDialogOpen={false}
              hideAppBar={false}
            /> */}
      {showNewVersionBanner && (
        <div className={styles.newVersionBannerContainer}>
          <Typography variant="body1">
            E' disponibile una nuova versione dell'app.
          </Typography>
          <Button
            variant="text"
            size="small"
            className={styles.updateNewVersionButton}
            onClick={onRefreshToInstallNewVersion}
          >
            Aggiorna
          </Button>
          <IconButton
            className={styles.closeNewVersionBannerButton}
            onClick={onCloseInstallNewVersionBanner}
          >
            <HighlightOff className={styles.closeNewVersionBannerButtonIcon} />
          </IconButton>
        </div>
      )}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/sheet/:id/:page" component={Sheet} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
