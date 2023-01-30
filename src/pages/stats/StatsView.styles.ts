import createStyles from '@mui/styles/createStyles';
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
    abilityContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    subTitle: {
      flex: 1
    },
    ispiration: {
      flex: 1,
      fontSize: 24,
      display: 'flex',
      flexDirection: 'row',
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
