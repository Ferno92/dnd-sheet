import React, { useState } from "react";
import BattleViewStyles from "./BattleView.styles";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  ListItem,
  List,
  IconButton
} from "@material-ui/core";
import StatsType from "data/types/StatsEnum";
import { useTheme } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";

interface BattleViewProps {
  onEdit: boolean;
  id: number;
}

function BattleView(props: BattleViewProps) {
  const { onEdit } = props;
  const classes = BattleViewStyles();
  const [caModifiersOpen, setCaModifiersOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [caModifiers, setCaModifiers] = useState([
    { type: "Base", value: 10, canDelete: false },
    { type: StatsType.Destrezza, value: 2, canDelete: false },
    { type: "Armature", value: 0 }
  ]);

  const getCA = () => {
      let count = 0
      caModifiers.forEach(modifier =>{
          count += modifier.value
      })
    return count;
  };

  const showCAmodifiers = () => {
    setCaModifiersOpen(true);
  };

  //if taglia != da media +1/-1
  return (
    <div className={classes.container}>
      <Typography variant="h6" className={classes.title}>
        Classe Armatura
      </Typography>
      {/* <MixedInputGrid
                inputInfo={{ type: 'Altro', value: 0 }}
                inputPos={InputPosition.End}
                modifiers={caModifiers}
                onChange={() => { }}
                onEdit={onEdit}
                label={'CA'}
                sign={false}
            /> */}
      <Button
        disabled={!onEdit}
        variant="outlined"
        className={classes.caContainer}
        onClick={() => (onEdit ? showCAmodifiers() : undefined)}
      >
        <div className={classes.caTitle}>CA</div>
        <div className={classes.caValue}>{getCA()}</div>
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={caModifiersOpen}
        onClose={() => setCaModifiersOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogTitle>
            <Typography>Modificatori CA:</Typography>
            <IconButton className={classes.closeDialog} onClick={() => setCaModifiersOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <List>
            {caModifiers.map(modifier => {
              return (
                <ListItem key={modifier.type} className={classes.listItem}>
                  <div>{modifier.type}</div>
                  <div>{modifier.value}</div>
                </ListItem>
              );
            })}
            <ListItem className={classes.listItem}>
              <div>TOT</div>
              <div>{getCA()}</div>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default BattleView;
