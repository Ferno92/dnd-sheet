import React from 'react'
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'
import useStyles from './LoginDialog.styles'
import { Close } from '@material-ui/icons'
import { BasicProfile, GoogleUser } from 'pages/dashboard/Dashboard'
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from 'react-google-login'

interface LoginDialogProps {
  user?: GoogleUser
  open: boolean
  onClose: () => void
  onLogin: (user?: BasicProfile) => void
  onLogout: () => void
}

const LoginDialog: React.FC<LoginDialogProps> = (props: LoginDialogProps) => {
  const { open, onClose, onLogin, onLogout, user } = props
  const styles = useStyles()

  const responseGoogle = (
    response: any //GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log('google', response)
    if (response.googleId) {
      const loginResponse = response as GoogleLoginResponse
      onLogin(loginResponse.getBasicProfile())
    } else {
      const offlineResponse = response as GoogleLoginResponseOffline
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className={styles.dialogRoot}>
      <DialogTitle className={styles.dialogTitle}>
        <Typography>Login</Typography>
        <IconButton className={styles.closeDialog} onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.content}>
        {user ? (
          <Typography variant="body1">{`Sei loggato come ${user.name}, vuoi fare logout?`}</Typography>
        ) : (
          <Typography variant="body1">
            Non hai ancora effettuato il login. Se vuoi usare i tuoi personaggi
            su più dispositivi, ti consigliamo di farlo. E' semplice e veloce!
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        {user ? (
          <GoogleLogout
            clientId="301028242623-nbso2movb7a8iuc4vd1oscanfnfh8m4g.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={onLogout}
          />
        ) : (
          <GoogleLogin
            clientId="301028242623-nbso2movb7a8iuc4vd1oscanfnfh8m4g.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            // isSignedIn={true}
          />
        )}
      </DialogActions>
    </Dialog>
  )
}
export default LoginDialog
