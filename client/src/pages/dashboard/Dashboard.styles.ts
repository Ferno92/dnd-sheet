import { createStyles } from "@material-ui/core";
import Theme from "assets/styles/Theme";
import { makeStyles } from "@material-ui/styles";

const DashboardStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: 50,
    width: 50,
    margin: 10
  },
  fab: {
      position: 'fixed',
      bottom: 10,
      right: 10
  }
}));

export default DashboardStyles;
