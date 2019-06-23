import { createStyles } from '@material-ui/core'
import Theme from 'assets/styles/Theme'

const DashboardStyles = (theme: Theme) =>
  createStyles({
    container: {
        background: theme.palette.background.default
    }
  })

export default DashboardStyles
