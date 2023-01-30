import Theme from 'assets/styles/Theme'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        position: 'unset'
    },
    list: {
        width: '100%'
    },
    panelDetails: {
        padding: 8
    }
}))

export default useStyles
