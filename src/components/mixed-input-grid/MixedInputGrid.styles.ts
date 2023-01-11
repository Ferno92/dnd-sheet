import Theme from "assets/styles/Theme";
import { makeStyles } from "@material-ui/styles";

const MixedInputGridStyles = makeStyles((theme: Theme) => ({
  mixedInputContainer: {
    display: "flex",
    alignItems: "left",
    flexDirection: "column"
  },
  mixedInput: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around"
  },
  modifier: {
    display: "flex",
    flexDirection: "column",
    margin: "0 16px",
    height: 60,
    justifyContent: "center"
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  modifierType: {
    fontWeight: "bold"
  },
  label: {
    fontWeight: "bold",
    maxWidth: 80,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  modifierValue: {
    fontSize: 24,
    textAlign: "center",
    minWidth: 30
  },
  fieldContainer: {
    margin: "0 16px"
  },
  operation: {
    width: "5vw",
    maxWidth: 35
  },
  labelOnTop: {
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  leftContainer: {
    flex: 2
  },
  rightContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  square: {
    display: "flex",
    flexDirection: "column",
    margin: "0 16px",
    justifyContent: "center",
    border: "solid",
    height: 70,
    textAlign: "center",
    width: 70
  }
}));

export default MixedInputGridStyles;
