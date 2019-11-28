import Theme from 'assets/styles/Theme'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 16
  },
  spellInfo: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `solid 1px ${theme.palette.border.main}`
  },
  spellError: {
    display: 'flex',
    alignItems: 'center'
  },
  spellErrorIcon: {
    marginRight: 8
  },
  slotLabel: {
    textAlign: 'center'
  },
  spellLevel: {
    width: 26,
    textAlign: 'center',
    border: `solid 1px ${theme.palette.border.main}`,
    borderRadius: 3
  },
  spellSummary: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export default useStyles
