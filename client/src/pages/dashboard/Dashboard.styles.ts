import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const DashboardStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      textAlign: 'center'
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
    }
  })
)

export default DashboardStyles
