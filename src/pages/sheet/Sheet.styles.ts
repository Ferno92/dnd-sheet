import { createStyles } from '@material-ui/core'
import Theme from 'assets/styles/Theme'
import ColorUtils from 'utils/ColorUtils'

const SheetStyles = (theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.backgroundSecondary.default
    },
    swipeableViews: {
    },
    bottomNavigation: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      left: 0,
      height: 76,
      '& svg': {
        fill: theme.palette.text.primary
      },
      '& .Mui-selected svg': {
        fill: theme.palette.background.default
      },
      '& .MuiBottomNavigationAction-root': {
        minWidth: 'auto'
      }
    },
    navigationIcon: {
      marginTop: 10
    },
    fab: {
      position: 'absolute',
      bottom: 45,
      right: 0,
      margin: 10,
      zIndex: 10,
      '& .MuiSpeedDialAction-staticTooltipLabel': {
        color: ColorUtils.hexToNegative(theme.palette.text.primary),
        backgroundColor: ColorUtils.hexToNegative(theme.palette.background.paper),
        width: '40vw',
        textAlign: 'end'
      }
    },
    fabIcon: {
      height: 24,
      width: 24
    },
    speedDial: {
      marginTop: 6
    },
    otherText: {
      color: theme.palette.text.primary
    },
    speedDialIcon: {
      height: 28.8
    },
    speedDialAction: {
      color: ColorUtils.hexToNegative(theme.palette.text.primary),
      backgroundColor: ColorUtils.hexToNegative(theme.palette.background.paper)
    }
  })

export default SheetStyles
