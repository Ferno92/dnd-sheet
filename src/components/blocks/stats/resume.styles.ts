import Theme from 'assets/styles/Theme'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
    infoBigPanelDetail: {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap'
    },
    infoBigScreen: {
      display: 'flex',
      width: '100%',
      marginTop: 16,
      alignItems: 'center'
    },
    infoDetails: {
      display: 'flex',
      flexDirection: 'column'
    },
    multiLevelContainerOnEdit: {
      width: '100%',
      marginRight: 0
    },
    multiLevelContainer: {
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },
    multiclass: {
      marginBottom: 10,
      marginLeft: 0
    },
    editAvatar: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    },
    emptyImage: {
      height: 70,
      width: 70
    },
    avatar: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0
    },
    infoAvatar: {
      height: 60,
      width: 60,
      marginRight: 16,
      position: 'relative'
    },
    infoSummary: {
      display: 'flex',
      alignItems: 'center'
    },
    secondClassLevel: {
      flexShrink: 0,
      margin: '0 52px'
    },
    [theme.breakpoints.up('sm')]: {
      infoDetails: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
      multiLevelContainer: {
        width: 'calc(50% - 8px)',
        marginRight: 8
      },
      infoDetailsItem: {
        width: 'calc(50% - 8px)',
        marginTop: 0,
        marginRight: 8
      },
      secondClassLevel: {
        marginBottom: 10
      },
    },
    [theme.breakpoints.up('md')]: {
      infoSummary: {
        flexDirection: 'column',
        marginRight: 16
      },
      infoAvatar: {
        height: 180,
        width: 180,
        marginRight: 0
      },
      infoReadOnly: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
    },
    [theme.breakpoints.up('lg')]: {
      infoAvatar: {
        height: 320,
        width: 320
      }
    }
}))

export default useStyles