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
  Grid
} from "@material-ui/core";
import StatsType from "data/types/StatsEnum";
import { useTheme } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import TextFieldNumber from "components/text-field-number/TextFieldNumber";
import TextFieldString from "components/text-field-string/TextFieldString";
import PG from "pages/stats/models/PG";
import SizeEnum from "data/types/SizeEnum";
import StatsUtils from "utils/StatsUtils";
import clsx from "clsx";

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
  onChangeSpeed: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangePF: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function BattleView(props: BattleViewProps) {
  const { onEdit, onSaveModifiers, pg, onChangeSpeed, onChangePF } = props;
  const classes = BattleViewStyles();
  const [caModifiersOpen, setCaModifiersOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let defaultModifiers = [
    { type: "Base", value: 10, canDelete: false },
    { type: StatsType.Destrezza, value: StatsUtils.getStatValue(StatsType.Destrezza, pg), canDelete: false }
  ]

  if (StatsUtils.getRaceSize(pg) === SizeEnum.Piccola) {
    defaultModifiers.push({ type: 'Taglia', value: 1, canDelete: false })
  }
  const [caModifiers, setCaModifiers] = useState<Modifier[]>(defaultModifiers);

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
    if (pg && pg.caModifiers) {
      pg.caModifiers.forEach(modifier => {
        if (!caModifiers.find(ca => ca.type === modifier.type && ca.value === modifier.value)) {
          modifiers.push(modifier)
        }
      })
      if (modifiers.length >= pg.caModifiers.length + defaultModifiers.length && modifiers.length > caModifiers.length) {
        setCaModifiers(modifiers)
      }
    }
  }, [pg, pg.caModifiers, caModifiers, defaultModifiers.length])

  return (
    <div className={classes.container}>
      <Typography variant='h6' className={classes.title}>Combattimento</Typography>
      <Grid container spacing={3}>
        <Grid
          item
          xs={4}
          className={classes.gridItem}
        >
          <Button
            disabled={!onEdit}
            variant="outlined"
            className={classes.caContainer}
            onClick={() => (onEdit ? showCAmodifiers() : undefined)}
          >
            <div className={classes.caTitle}>CA</div>
            <div className={classes.caValue}>{getCA()}</div>
          </Button>

        </Grid>
        <Grid
          item
          xs={4}
          className={classes.gridItem}
        >
          <TextFieldNumber disabled label={'Iniziativa'} value={StatsUtils.getStatValue(StatsType.Destrezza, pg)} onChange={() => { }} />
        </Grid>

        <Grid
          item
          xs={4}
          className={clsx(classes.gridItem, classes.speed)}
        >
          <TextFieldNumber
            disabled={!onEdit}
            label={'Velocità(m)'}
            value={pg.speed && pg.speed !== '' ? parseFloat(pg.speed) : 0}
            onChange={onChangeSpeed}
            min={0} max={150} step={'1.5'} />
        </Grid>
      </Grid>

      <Grid
        item
        xs={4}
        className={classes.gridItem}
      >
        <TextFieldNumber disabled={!onEdit} label={'PF'} value={pg.pf} onChange={onChangePF} min={0} max={999} />
      </Grid>
      {/* ________________ CA dialog _____________ */}
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
