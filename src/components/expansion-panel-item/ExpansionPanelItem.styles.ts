import Theme from 'assets/styles/Theme'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  },
  withButtons: {
    display: 'flex',
    alignItems: 'center'
  },
  panel: {
    flex: 1,
    marginBottom: 1
  },
  highlight: {
    border: 'solid 1px',
    borderRadius: 3
  },
  title: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiButtonBase-root': {
      padding: 4,
      marginRight: 8
    },
    '& .MuiSvgIcon-root': {
      height: 24,
      width: 24
    }
  },
  noCheckbox: {
    width: 40
  },
  details: {
    flexDirection: 'column'
  }
}))

export default useStyles
