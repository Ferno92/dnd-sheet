import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const DashboardStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center',
      padding: '16px 0',
      background: theme.palette.secondary.light,
      color: '#fff'
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
    list: {
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
    }
  })
)

export default DashboardStyles
