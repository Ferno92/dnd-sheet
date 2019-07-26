import { createStyles } from "@material-ui/core";
import Theme from "assets/styles/Theme";

const TextFieldNumberStyles = (theme: Theme) => createStyles({
    textField: {
        marginBottom: 10,
        '& .MuiInputBase-input': {
            textAlign: 'center',
            width: 50
        }
    }
});

export default TextFieldNumberStyles;
