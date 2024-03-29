import { createStyles } from '@material-ui/core'
import Theme from 'assets/styles/Theme'

const StatsViewStyles = (theme: Theme) =>
  createStyles({
    container: {
      height: 'calc(100vh - 75px)'
    },
    inputContainer: {
      padding: 10,
      paddingBottom: 86,
      position: 'relative'
    },
    gridContainer: {
      width: 'calc(100% - 4px)',
      marginLeft: 2,
      marginBottom: 15
    },
    gridItem: {
      paddingBottom: '0 !important'
    },
    divider: {
      margin: '20px 0 10px 0'
    },
    title: {
      textAlign: 'center',
      marginBottom: 10,
      flex: 1
    },
    modifier: {
      border: 'solid',
      borderColor: theme.palette.border.main,
      color: theme.palette.text.primary,
      borderRadius: '50%',
      borderWidth: 1,
      height: 30,
      width: 30,
      marginLeft: -10,
      textAlign: 'center',
      lineHeight: '30px',
      backgroundColor: theme.palette.background.paper,
      zIndex: 1
    },
    stat: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    abilitiesHeader: {
      display: 'flex',
      alignItems: 'center'
    },
    abilityContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    abilityInfo: {},
    subTitle: {
      flex: 1
    },
    taglia: {
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    ispiration: {
      flex: 1,
      fontSize: 24,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    tsPanelTitle: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    abilityCheckbox: {
      display: 'flex',
      alignItems: 'center',
      '& .MuiButtonBase-root': {
        padding: 4,
        marginRight: 8
      },
      '& .MuiSvgIcon-root': {
        height: 24,
        width: 24
      }
    },
    noCheckbox: {
      width: 40
    },
    abilityHighlight: {
      border: 'solid 1px',
      borderRadius: 3
    },
    abilityPanel: {
      marginBottom: 1
    },
    peContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    peProgress: {
      flex: 1,
      marginLeft: 16,
      marginRight: 16
    },
    quantity: {
      width: 16,
      textAlign: 'center',
      marginRight: 4
    },
    invisibleQuantity: {
      visibility: 'hidden'
    },
    backgroundEqListItem: {
      display: 'flex',
      marginBottom: 8
    },
    bgTitle: {
      padding: 24
    },
    bgContent: {
      padding: '0 24px'
    },
    infoIcon: {
      marginRight: 8,
      color: theme.palette.text.primary
    },
    tempIcon: {
      '&.active': {
        color: theme.palette.primary.main
      }
    },
    statTitleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statPositive: {
      borderColor: theme.palette.success.main,
      borderWidth: 2,
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 2,
        borderColor: `${theme.palette.success.main} !important`
      }
    },
    statNegative: {
      borderWidth: 2,
      borderColor: theme.palette.warning.main,
      '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: 2,
        borderColor: `${theme.palette.warning.main} !important`
      }
    },
    tsPositive: {
      color: theme.palette.success.main
    },
    tsNegative: {
      color: theme.palette.warning.main
    },
    readOnly: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    },
    [theme.breakpoints.up('md')]: {
      inputContainer: {
        padding: 16
      }
    }
  })

export default StatsViewStyles
