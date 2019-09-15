import React, { useState, useCallback, useEffect } from "react";
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
  IconButton,
  DialogActions,
  TextField
} from "@material-ui/core";
import StatsType from "data/types/StatsEnum";
import { useTheme } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import TextFieldNumber from "components/text-field-number/TextFieldNumber";
import TextFieldString from "components/text-field-string/TextFieldString";
import PG from "pages/stats/models/PG";

export interface Modifier {
  type: string
  value: number
  canDelete: boolean
}

interface BattleViewProps {
  onEdit: boolean;
  id: number;
  pg: PG
  onSaveModifiers: (modifiers: Modifier[]) => void
}

function BattleView(props: BattleViewProps) {
  const { onEdit, onSaveModifiers, pg } = props;
  const classes = BattleViewStyles();
  const [caModifiersOpen, setCaModifiersOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [caModifiers, setCaModifiers] = useState<Modifier[]>([
    { type: "Base", value: 10, canDelete: false },
    { type: StatsType.Destrezza, value: 2, canDelete: false }
  ]);

  const getCA = useCallback(() => {
    let count = 0;
    caModifiers.forEach(modifier => {
      count += modifier.value;
    });
    return count;
  }, [caModifiers]);

  const showCAmodifiers = useCallback(() => {
    setCaModifiersOpen(true);
  }, []);

  const addCAitem = useCallback(() => {
    setCaModifiers([...caModifiers, { type: "", value: 0, canDelete: true }])
  }, [caModifiers])

  const deleteCaModifier = useCallback((index: number) => {
    let modifiers = [...caModifiers]
    modifiers.splice(index, 1)
    setCaModifiers(modifiers)
  }, [caModifiers])

  const onChangeModifierType = useCallback((value: string, index: number) => {
    let modifiers = [...caModifiers]
    modifiers[index].type = value
    setCaModifiers(modifiers)
  }, [caModifiers])

  const onChangeModifierValue = useCallback((value: number, index: number) => {
    let modifiers = [...caModifiers]
    modifiers[index].value = value
    setCaModifiers(modifiers)
  }, [caModifiers])

  useEffect(() => {
    const modifiers = [...caModifiers]
    console.log('pg', pg)
    if (pg && pg.caModifiers) {
      pg.caModifiers.forEach(modifier => {
        if (!caModifiers.find(ca => ca.type === modifier.type && ca.value === modifier.value)) {
          modifiers.push(modifier)
        }
      })
      if (modifiers.length >= pg.caModifiers.length + 2 && modifiers.length > caModifiers.length) {
        setCaModifiers(modifiers)
      }
    }
  }, [pg.caModifiers, caModifiers])

  //TODO if taglia != da media +1/-1
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
        className={classes.dialogRoot}
      >
        <DialogContent>
          <DialogTitle className={classes.dialogTitle}>
            <Typography>Modificatori CA:</Typography>
            <IconButton
              className={classes.closeDialog}
              onClick={() => setCaModifiersOpen(false)}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <List>
            {caModifiers.map((modifier: Modifier, index: number) => {
              return (
                <ListItem key={index} className={classes.listItem}>
                  {!modifier.canDelete && (
                    <React.Fragment>
                      <div>{modifier.type}</div>
                      <div>{modifier.value}</div>
                    </React.Fragment>
                  )
                  }
                  {modifier.canDelete && (
                    <React.Fragment>
                      <TextFieldString
                        label=''
                        name=''
                        disabled={!onEdit}
                        onChange={(value: string, property: string) => { onChangeModifierType(value, index) }}
                        value={modifier.type}
                        root={classes.modifierType} />
                      <TextFieldNumber
                        label=''
                        value={modifier.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChangeModifierValue(parseInt(e.currentTarget.value), index) }}
                        disabled={!onEdit}
                        min={0}
                        max={100}
                        root={classes.modifierValue} />
                      <IconButton onClick={() => deleteCaModifier(index)}>
                        <Close />
                      </IconButton>
                    </React.Fragment>
                  )}
                </ListItem>
              );
            })}
            <div className={classes.addButton}>
              <Button className={classes.dialogActionButton} onClick={addCAitem}>
                Aggiungi
            </Button>
            </div>
            <ListItem className={classes.listItem}>
              <div>TOT</div>
              <div>{getCA()}</div>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            className={classes.dialogActionButton}
            color="primary"
            onClick={() => onSaveModifiers(caModifiers)}
          >
            Salva
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BattleView;
