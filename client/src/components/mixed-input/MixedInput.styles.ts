import Theme from "assets/styles/Theme";
import { makeStyles } from "@material-ui/styles";

const MixedInputStyles = makeStyles((theme: Theme) => ({
    mixedInput: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    modifier: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 16px',
        height: 60,
        justifyContent: 'flex-start'
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    modifierType: {
        fontWeight: 'bold'
    },
    modifierValue: {
        fontSize: 24,
        textAlign: 'center'
    },
    fieldContainer: {
        margin: '0 16px'
    },
    operation: {
        width: '5vw',
        maxWidth: 35
    }
}));

export default MixedInputStyles;
