import Theme from 'assets/styles/Theme'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
    generalInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8
    },
    generalInfoIcon: {
      padding: 8
    },
    moreInfos: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    moreInfo: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 8
    },
    infoIcon: {
      marginRight: 8,
      color: theme.palette.text.primary
    }
}))

export default useStyles