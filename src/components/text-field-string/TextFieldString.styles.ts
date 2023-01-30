import createStyles from '@mui/styles/createStyles';
import Theme from "assets/styles/Theme";

const TextFieldStringStyles = (theme: Theme) => createStyles({
    textField: {
        marginBottom: 10
    },
    label: {
        color: `${theme.palette.text.primary} !important`
    }
});

export default TextFieldStringStyles;
