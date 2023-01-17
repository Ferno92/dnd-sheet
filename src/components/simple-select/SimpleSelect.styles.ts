import Theme from 'assets/styles/Theme'
import { makeStyles } from '@material-ui/styles'

const SimpleSelectStyles = makeStyles((theme: Theme) => ({
  label: {
    color: theme.palette.text.primary
  },
  raceInputField: {
    marginBottom: 10,
    '& .MuiSelect-root': {
      height: 56
    },
    '& .MuiSelect-selectMenu': {
      height: 20,
      padding: 12
    }
  }
}))

export default SimpleSelectStyles
