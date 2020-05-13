import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const DashboardStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      alignItems: 'center',
      background: theme.palette.secondary.light
    },
    loginButtonContainer: {
      flex: 1
    },
    loginButton: {
      color: '#fff',
      padding: 8,
      margin: 8
    },
    rightAction: {
      flex: 1
    },
    title: {
      textAlign: 'center',
      padding: '16px 0',
      color: '#fff',
      flex: 2
    },
    avatar: {
      height: 50,
      width: 50,
      margin: 10
    },
    fab: {
      position: 'fixed',
      bottom: 20,
      right: 20
    },
    root: {},
    list: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      '& .MuiListItem-container': {
        display: 'block'
      }
    },
    emptyDescription: {
      margin: '20vh auto',
      maxWidth: 260,
      textAlign: 'center',
      '& svg': {
        width: 160,
        height: 160,
        marginBottom: 24
      }
    },
    skeletonContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: 16
    },
    skeletonInfo: {
      marginLeft: 8
    },
    skeleton: {
      marginBottom: 8
    },
    [theme.breakpoints.up('md')]: {
      item: {},
      list: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 8,
        '& .MuiListItem-container': {
          width: 'calc(50% - 16px)',
          borderRadius: 3,
          border: `solid 1px ${theme.palette.border.main}`,
          marginBottom: 8,
          marginRight: 8
        }
      },
      fab: {
        bottom: undefined,
        top: 40,
        right: 20
      },
      title: {
        marginBottom: 24
      }
    },
    [theme.breakpoints.up('lg')]: {
      item: {},
      list: {
        '& .MuiListItem-container': {
          width: 'calc(33% - 8px)'
        }
      }
    }
  })
)

export default DashboardStyles
