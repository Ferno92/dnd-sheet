import Theme from "assets/styles/Theme";
import { makeStyles } from "@material-ui/styles";

const SimpleSelectStyles = makeStyles((theme: Theme) => ({    
    raceInputField: {
        marginBottom: 10,
        '& .MuiSelect-root': {
            height: 56
        },
        '& .MuiSelect-selectMenu': {
            height: 20
        }
    }
}));

export default SimpleSelectStyles;