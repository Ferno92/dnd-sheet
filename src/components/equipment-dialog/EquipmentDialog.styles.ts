import Theme from 'assets/styles/Theme'
import { makeStyles } from '@mui/styles'

const useEquipmentDialogStyles = makeStyles((theme: Theme) => ({
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
  weaponName: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 20
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
  bonusField: {
    marginTop: 20,
    minWidth: 140,
    width: 140,
    textAlign: 'center',
    '& .MuiInputBase-input': {
      width: '140px !important'
    }
  }
}))

export default useEquipmentDialogStyles
