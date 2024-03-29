import Theme from 'assets/styles/Theme'
import { makeStyles } from '@material-ui/styles'
import ColorUtils from 'utils/ColorUtils'

const BattleViewStyles = makeStyles((theme: Theme) => ({
  container: {
    height: 'calc(100vh - 95px)',
    padding: 10,
    marginBottom: 84
  },
  inputContainer: {
    paddingBottom: 86,
    position: 'relative'
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    flex: 1
  },
  caContainer: {
    display: 'block',
    height: 'auto',
    margin: '0 auto'
  },
  caTitle: {
    fontSize: 12,
    height: 12,
    lineHeight: '12px'
  },
  caValue: {},
  listItem: {
    justifyContent: 'space-between'
  },
  closeDialog: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  dialogTitle: {
    margin: 0,
    padding: '20px 0'
  },
  dialogActionButton: {
    '& .MuiButton-label': {
      fontSize: 16,
      height: 16
    }
  },
  addButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  dialogRoot: {
    '& .MuiDialogContent-root': {
      padding: '0 16px'
    }
  },
  modifierValue: {
    flex: 1
  },
  modifierType: {
    flex: 3
  },
  gridItem: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  speed: {
    '& .MuiInputBase-input': {
      width: 70
    }
  },
  flexRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:first-child': {
      marginBottom: 4
    }
  },
  tsContainer: {
    border: 'solid 1px #000000',
    width: 'calc(100% - 16px)',
    borderRadius: 3,
    padding: '0 8px'
  },
  checkboxContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around'
  },
  tslabel: {
    margin: '0 8px'
  },
  checkbox: {
    padding: 0,
    height: 25,
    '& svg': {
      width: 25
    }
  },
  pfContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  pf: {
    margin: '0 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  currentPf: {
    display: 'inline',
    '&.red': {
      color: 'red'
    },
    '&.yellow': {
      color: 'orange'
    },
    '&.green': {
      color: 'green'
    },
    '&.blue': {
      color: 'blue'
    }
  },
  pfTot: {
    display: 'inline'
  },
  weaponHeader: {
    // paddingLeft: 16,
    // paddingRight: 16,
    borderBottom: 'solid 1px',
    marginTop: 8
  },
  weaponGridItem: {
    display: 'flex',
    alignItems: 'center'
  },
  weaponListItem: {
    paddingRight: 0,
    paddingLeft: 0
  },
  weaponInfoButton: {
    height: '0.8em',
    width: '0.8em'
  },
  weaponInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottom: 'solid 1px #cccccc',
    paddingBottom: 8,
    marginBottom: 8
  },
  weaponName: {
    fontWeight: 700
  },
  weaponTitle: {
    marginTop: 16
  },
  armorDetails: {
    flexDirection: 'column'
  },
  armorLabel: {
    display: 'flex',
    alignItems: 'center'
  },
  armorDetailTitle: {
    marginRight: 8
  },
  armorItem: {
    display: 'flex',
    alignItems: 'center'
  },
  armorPanel: {
    flex: 1
  },
  armorPanelSummary: {
    '& .MuiExpansionPanelSummary-content': {
      alignItems: 'center'
    }
  },
  armorCheckBox: {
    padding: 4,
    marginRight: 8
  },
  armorTitle: {
    marginTop: 16,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
    justifyContent: 'space-between'
  },
  abilityHighlight: {
    border: 'solid 1px',
    borderRadius: 3
  },
  privilegeSummary: {
    '& .MuiExpansionPanelSummary-content': {
      justifyContent: 'space-between'
    }
  },
  divider: {
    margin: '20px 0 10px 0',
    width: '100%',
    background: ColorUtils.hexToNegative(theme.palette.background.paper)
  },
  specialAbilityTitle: {
    marginBottom: 8,
    textTransform: 'uppercase'
  },
  counterButton: {
    padding: '2px 8px',
    minHeight: 0,
    minWidth: 0,
    marginTop: -4,
    marginBottom: -4,
    marginRight: -8,
    marginLeft: 8
  },
  counterContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  initiative: {
    '& .MuiInputBase-input': {
      textAlign: 'center',
      padding: '10.5px 14px'
    }
  },
  pfModifiers: {
    display: 'flex',
    flexDirection: 'column'
  },
  pfModifier: {
    padding: 0,
    height: 40,
    width: 40
  },
  expansionPanelIcon: {
    padding: 8
  },
  readOnly: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }
}))

export default BattleViewStyles
