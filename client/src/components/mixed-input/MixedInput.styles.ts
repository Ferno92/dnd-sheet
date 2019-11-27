import Theme from 'assets/styles/Theme'
import { makeStyles } from '@material-ui/styles'

const MixedInputStyles = makeStyles((theme: Theme) => ({
  mixedInputContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  mixedInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  modifier: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 8px',
    height: 60,
    justifyContent: 'center'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  modifierType: {
    fontWeight: 'bold'
  },
  label: {
    fontWeight: 'bold',
    maxWidth: 80,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  modifierValue: {
    fontSize: 24,
    textAlign: 'center',
    minWidth: 30
  },
  fieldContainer: {
    margin: '0 8px'
  },
  operation: {
    width: '5vw',
    maxWidth: 35
  },
  labelOnTop: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
}))

export default MixedInputStyles
