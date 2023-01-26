import Theme from 'assets/styles/Theme'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: '16px'
    },
    title: {
        textTransform: 'uppercase'
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    expandedItem: {
        flexGrow: 1
    }
}))

export default useStyles