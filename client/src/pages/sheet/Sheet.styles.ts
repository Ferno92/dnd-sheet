import { createStyles } from "@material-ui/core";
import Theme from "assets/styles/Theme";

const SheetStyles = (theme: Theme) =>
  createStyles({
    container: {
      background: theme.palette.backgroundSecondary.default
    },
    bottomNavigation: {
      position: "fixed",
      bottom: 0,
      right: 0,
      left: 0,
      paddingBottom: 20,
      "& .Mui-selected svg": {
        fill: theme.palette.background.default
      }
    },
    navigationIcon: {
      marginTop: 10
    },
    fab: {
      position: "absolute",
      top: 0,
      right: 0,
      margin: 10,
      zIndex: 10
    }
  });

export default SheetStyles;
