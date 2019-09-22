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
    display: "block",
    height: "auto",
    margin: "0 auto"
  },
  caTitle: {
    fontSize: 12,
    height: 12,
    lineHeight: "12px"
  },
  caValue: {},
  listItem: {
    justifyContent: "space-between"
  },
  closeDialog: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  dialogTitle: {
    margin: 0,
    padding: "20px 0"
  },
  dialogActionButton: {
    "& .MuiButton-label": {
      fontSize: 16,
      height: 16
    }
  },
  addButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  dialogRoot: {
    "& .MuiDialogContent-root": {
      padding: "0 16px"
    }
  },
  modifierValue: {
    flex: 1
  },
  modifierType: {
    flex: 3
  },
  gridItem: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  speed: {
    "& .MuiInputBase-input": {
      width: 70
    }
  },
  flexRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:first-child': {
      marginBottom: 4
    }
  },
  tsContainer: {
    border: 'solid 1px #000000',
    width: 'calc(100% - 16px)',
    borderRadius: 3,
    padding: '0 8px'
  },
  checkboxContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around'
  },
  tslabel: {
    margin: '0 8px'  
  },
  checkbox: {
    padding: 0,
    height: 25,
    '& svg': {
      width: 25
    }
  }
}));

export default BattleViewStyles;
