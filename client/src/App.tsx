import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Sheet from './pages/sheet/Sheet'
import Dashboard from 'pages/dashboard/Dashboard'
import { Typography, Button, IconButton } from '@material-ui/core'
import { HighlightOff } from '@material-ui/icons'
import useStyles from 'App.styles'
import firebase from 'firebase/app'
import DownloadPG from 'pages/download/DownloadPG'
import PrivacyPolicy from 'pages/privacy/PrivacyPolicy'

export const firebaseConfig = {
  apiKey: 'AIzaSyB1kmz-zbEFRX72gkvxWTHg8CW0I6Qk9As',
  authDomain: 'dnd-sheet-f7049.firebaseapp.com',
  databaseURL: 'https://dnd-sheet-f7049.firebaseio.com',
  projectId: 'dnd-sheet-f7049',
  storageBucket: 'dnd-sheet-f7049.appspot.com',
  messagingSenderId: '301028242623',
  appId: '1:301028242623:web:66f946f5d29caa2656420a',
  measurementId: 'G-L2099R8SDB'
}

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
      window.location.reload()
    }
  }

  const onCloseInstallNewVersionBanner = () => {
    setShowNewVersionBanner(false)
  }

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
      // firebase.analytics()
    }
    window.addEventListener('sw-installed', onNewServiceWorkerInstalled, false)

    return () => {
      window.removeEventListener('sw-installed', onNewServiceWorkerInstalled)
    }
  }, [])
  return (
      <>
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
          <Route exact path="/download/:id" component={DownloadPG} />
          <Route exact path="/privacy" component={PrivacyPolicy} />
        </Switch>
      </BrowserRouter>
      </>
  )
}

export default App
