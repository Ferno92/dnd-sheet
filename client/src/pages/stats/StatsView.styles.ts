import { createStyles } from "@material-ui/core";
import Theme from "assets/styles/Theme";

const StatsViewStyles = (theme: Theme) => createStyles({
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
    divider:{
        margin: '20px 0 10px 0'
    },
    title: {
        textAlign: 'center',
        marginBottom: 10
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
        alignItems: 'center'
    },
    raceInputField: {
        marginBottom: 10,
        '& .MuiSelect-root': {
            height: 56
        },
        '& .MuiSelect-selectMenu': {
            height: 20
        }
    }
});

export default StatsViewStyles;
