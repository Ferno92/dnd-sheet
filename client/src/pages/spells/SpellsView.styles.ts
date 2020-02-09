import Theme from 'assets/styles/Theme'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 16,
    height: 'calc(100vh - 75px)'
  },
  inputContainer: {
    paddingBottom: 86
  },
  spellInfoContainer: {
    marginBottom: 16
  },
  spellInfo: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `solid 1px ${theme.palette.border.main}`,
    marginBottom: 4
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
  },
  spellContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  spellExpansionPanel: {
    flex: 1
  },
  magicWand: {
    marginLeft: 8,
    padding: 8,
    '& svg': {
      height: 24,
      width: 24
    }
  },
  spellDetails: {
    flexDirection: 'column'
  },
  spellLabel: {
    display: 'flex',
    alignItems: 'center'
  },
  spellDetailTitle: {
    marginRight: 8
  },
  checkbox: {
    padding: 8,
    '& svg': {
      height: 24,
      width: 24
    }
  },
  expansionPanelSummary: {
    '& .MuiExpansionPanelSummary-content': {
      margin: 0
    }
  },
  addSpell: {
    padding: 8,
    '& svg': {
      height: 24,
      width: 24
    }
  },
  divider: {
    margin: '20px 0 10px 0',
    width: '100%'
  }
}))

export default useStyles
