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
    }
});

export default StatsViewStyles;
