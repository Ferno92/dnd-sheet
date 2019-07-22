import { createStyles } from "@material-ui/core";
import Theme from "assets/styles/Theme";
import { makeStyles } from "@material-ui/styles";

const DashboardStyles = makeStyles((theme: Theme) => ({
  title:{
    textAlign: 'center'
  },
  avatar: {
    height: 50,
    width: 50,
    margin: 10
  },
  fab: {
      position: 'fixed',
      bottom: 20,
      right: 20
  }
}));

export default DashboardStyles;
