import Theme from "assets/styles/Theme";
import { makeStyles } from "@material-ui/styles";

const BattleViewStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "calc(100vh - 95px)",    
    padding: 10
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
    flex: 1
  },
  caContainer: {
    display: 'block',
    height: 'auto'
  },
  caTitle: {
    fontSize: 12,
    height: 12,
    lineHeight: '12px'
  },
  caValue: {

  },
  listItem: {
    justifyContent: 'space-between'
  },
  closeDialog: {
    
  }
}));

export default BattleViewStyles;
