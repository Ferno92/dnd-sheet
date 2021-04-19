import { createStyles } from "@material-ui/core";
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
