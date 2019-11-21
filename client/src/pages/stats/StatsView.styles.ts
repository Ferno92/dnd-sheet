import { createStyles } from '@material-ui/core'
import Theme from 'assets/styles/Theme'

const StatsViewStyles = (theme: Theme) =>
  createStyles({
    container: {
      height: 'calc(100vh - 75px)'
    },
    inputContainer: {
      padding: 10
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
      borderRadius: '50%',
      borderWidth: 1,
      height: 30,
      width: 30,
      marginLeft: -10,
      textAlign: 'center',
      lineHeight: '30px',
      backgroundColor: '#fff',
      zIndex: 1
    },
    stat: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    abilitiesHeader: {
      display: 'flex'
    },
    abilityContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    abilityInfo: {},
    subTitle: {
      flex: 1,
      fontSize: 24
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
      alignItems: 'center'
    }
  })

export default StatsViewStyles
