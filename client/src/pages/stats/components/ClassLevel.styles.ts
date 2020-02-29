import Theme from 'assets/styles/Theme'
import { makeStyles } from '@material-ui/styles'
import { ClassLevelProps } from './ClassLevel'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    marginBottom: 10
  },
  iconButton: {
    padding: 8,
    margin: '0 4px'
  },
  label: (props: ClassLevelProps) => ({
    margin: props.readOnly ? '0 52px' : 0
  })
}))

export default useStyles
