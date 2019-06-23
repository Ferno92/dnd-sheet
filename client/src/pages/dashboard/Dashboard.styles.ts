import { createStyles } from "@material-ui/core";
import Theme from "assets/styles/Theme";

const DashboardStyles = (theme: Theme) =>
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
    slide: {
      height: '100%'
    },
    slide1:{
      background: 'red'
    },
    slide2:{
      background: 'blue'
    },
    slide3:{
      background: 'green'
    }
  });

export default DashboardStyles;
