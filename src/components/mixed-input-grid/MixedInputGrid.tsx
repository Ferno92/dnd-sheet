import React from "react";
import { Add, DragHandle } from "@material-ui/icons";
import TextFieldNumber from "components/text-field-number/TextFieldNumber";
import MixedInputGridStyles from "./MixedInputGrid.styles";
import { Grid } from "@material-ui/core";

interface Modifier {
  type: string;
  value: number;
}

export enum InputPosition {
  Start,
  End
}

interface MixedInputGridProps {
  modifiers: Modifier[];
  inputPos: InputPosition;
  inputInfo?: Modifier;
  onChange: (value: number) => void;
  onEdit: boolean;
  label: string;
  sign?: boolean;
}

function MixedInputGrid(props: MixedInputGridProps) {
  const classes = MixedInputGridStyles();
  const {
    modifiers,
    inputPos,
    inputInfo,
    onChange,
    onEdit,
    label,
    sign = true
  } = props;

  const getTotal = () => {
    let count = 0;
    modifiers.forEach(modifier => {
      count += modifier.value;
    });
    if (inputInfo) {
      count += inputInfo.value;
    }

    return `${count === 0 ? "" : sign ? (count > 0 ? "+" : "-") : ""}${Math.abs(
      count
    )}`;
  };

  return (
    <div className={classes.mixedInputContainer}>
      <div className={classes.mixedInput}>
        <div className={classes.leftContainer}>
          <Grid container>
            {modifiers.map((modifier, index) => {
              return (
                <Grid item key={`modifier-${modifier.type}`} xs={6}>
                  <div className={classes.flex}>
                    <div className={classes.modifier}>
                      <div className={classes.modifierType}>
                        {modifier.type}
                      </div>
                      <div className={classes.modifierValue}>
                        {modifier.value}
                      </div>
                    </div>
                    <Add className={classes.operation} />
                  </div>
                </Grid>
              );
            })}
            {inputInfo && (
              <Grid item xs={6}>
                <div className={classes.fieldContainer}>
                  <TextFieldNumber
                    label={inputInfo.type}
                    value={inputInfo.value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(parseInt(event.target.value));
                    }}
                    disabled={!onEdit}
                    min={0}
                    max={100}
                  />
                </div>
              </Grid>
            )}
            <Grid />
          </Grid>
        </div>

        <div className={classes.rightContainer}>
          <DragHandle className={classes.operation} />
          <div className={classes.square}>
            <div className={classes.label}>{label.toUpperCase()}</div>
            <div className={classes.modifierValue}>{getTotal()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MixedInputGrid;
