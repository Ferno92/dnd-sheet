import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import GlobalStyles from 'assets/styles/Global.styles'
import Theme from 'assets/styles/Theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...GlobalStyles(theme),
    newVersionBannerContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 40,
      padding: '4px 52px 4px 8px',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      position: 'relative',
      paddingRight: 52
    },
    closeNewVersionBannerButton: {
      padding: 6,
      position: 'absolute',
      right: 8
    },
    closeNewVersionBannerButtonIcon: {
      color: theme.palette.primary.contrastText
    },
    updateNewVersionButton: {
      color: theme.palette.primary.contrastText,
      marginLeft: 8
    }

  })
)

export default useStyles
