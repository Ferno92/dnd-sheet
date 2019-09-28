import Theme from "assets/styles/Theme";
import { makeStyles } from "@material-ui/styles";

const useWeaponDialogStyles = makeStyles((theme: Theme) => ({
  closeDialog: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  dialogTitle: {
    margin: 0,
    padding: "20px 0"
  }
}));

export default useWeaponDialogStyles;
