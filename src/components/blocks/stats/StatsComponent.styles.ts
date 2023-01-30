import Theme from 'assets/styles/Theme'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
    statTitleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      tempIcon: {
        '&.active': {
          color: theme.palette.primary.main
        }
      },
      stat: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      statPositive: {
        borderColor: theme.palette.success.main,
        borderWidth: 2,
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2,
          borderColor: `${theme.palette.success.main} !important`
        }
      },
      statNegative: {
        borderWidth: 2,
        borderColor: theme.palette.warning.main,
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2,
          borderColor: `${theme.palette.warning.main} !important`
        }
      },
      modifier: {
        border: 'solid',
        borderColor: theme.palette.border.main,
        color: theme.palette.text.primary,
        borderRadius: '50%',
        borderWidth: 1,
        height: 30,
        width: 30,
        marginLeft: -10,
        textAlign: 'center',
        lineHeight: '30px',
        backgroundColor: theme.palette.background.paper,
        zIndex: 1
      },
}))

export default useStyles