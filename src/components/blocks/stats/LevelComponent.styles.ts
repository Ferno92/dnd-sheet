import Theme from 'assets/styles/Theme'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
    taglia: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
      },
      infoIcon: {
        marginRight: 8,
        color: theme.palette.text.primary
      },
      peContainer: {
        display: 'flex',
        alignItems: 'center'
      },
      peProgress: {
        flex: 1,
        marginLeft: 16,
        marginRight: 16
      },
}))

export default useStyles