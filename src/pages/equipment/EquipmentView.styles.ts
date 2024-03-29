import Theme from 'assets/styles/Theme'
import { makeStyles } from '@material-ui/styles'

const useEquipmentViewStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 16,
    height: 'calc(100vh - 75px)'
  },
  inputContainer: {
    paddingBottom: 86,
    position: 'relative'
  },
  readOnly: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  moneys: {
    display: 'flex',
    marginTop: 16
  },
  dialogActionButton: {
    '& .MuiButton-label': {
      fontSize: 16,
      height: 16
    }
  },
  equipmentHeader: {
    // paddingLeft: 16,
    // paddingRight: 16,
    borderBottom: 'solid 1px',
    marginTop: 8
  },
  gridItem: {
    display: 'flex',
    alignItems: 'center'
  },
  equipmentInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottom: 'solid 1px #cccccc',
    paddingBottom: 8,
    marginBottom: 8
  },
  equipmentName: {
    fontWeight: 700
  },
  itemInfoButton: {
    height: '0.8em',
    width: '0.8em'
  },
  centerGridValue: {
    textAlign: 'center'
  },
  capacity: {
    margin: '0 16px'
  },
  currentCapacity: {
    display: 'inline',
    '&.red': {
      color: 'red'
    }
  },
  capacityTot: {
    display: 'inline'
  },
  divider: {
    margin: '20px 0 10px 0',
    width: '100%'
  }
}))

export default useEquipmentViewStyles
