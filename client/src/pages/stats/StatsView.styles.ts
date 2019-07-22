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
        marginLeft: 2
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
    }
});

export default StatsViewStyles;
