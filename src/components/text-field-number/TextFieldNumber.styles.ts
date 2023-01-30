import Theme from 'assets/styles/Theme'
import { makeStyles } from '@mui/styles'
import { TextFieldNumberProps } from './TextFieldNumber'

const useStyles = makeStyles((theme: Theme) => ({
  textField: (props: TextFieldNumberProps) => ({
    marginBottom: 10,
    '& .MuiInputBase-input': {
      textAlign: 'center',
      width: props.fullWidth ? '100%' : 50
    }
  }),
  label: {
      color: `${theme.palette.text.primary} !important`
  }
}))

export default useStyles
