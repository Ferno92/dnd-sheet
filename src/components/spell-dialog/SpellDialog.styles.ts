import Theme from 'assets/styles/Theme'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  closeDialog: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  dialogTitle: {
    padding: '20px 0',
    marginLeft: 16
  },
  dialogRoot: {
    '& .MuiDialogContent-root': {
      padding: '0 16px'
    }
  },
  gridItem: {
    textAlign: 'center'
  },
  itemTitle: {
    fontWeight: 700
  },
  dialogActionButton: {
    '& .MuiButton-label': {
      fontSize: 16,
      height: 16
    }
  },
  levelInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  level: {
    marginLeft: 8
  },
  materials: {
    marginLeft: 8
  }
}))

export default useStyles
