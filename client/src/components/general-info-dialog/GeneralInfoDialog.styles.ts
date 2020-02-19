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
  dialogActionButton: {
    '& .MuiButton-label': {
      fontSize: 16,
      height: 16
    }
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  alignmentContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  alignment: {
    minWidth: 240,
    marginTop: 12,
    marginBottom: 8
  },
  label: {
    marginLeft: 8
  }
}))

export default useStyles
