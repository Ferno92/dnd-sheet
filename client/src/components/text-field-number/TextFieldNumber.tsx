import React, { Component } from "react";
import { WithStyles } from "@material-ui/styles";
import { withStyles, TextField } from "@material-ui/core";
import TextFieldNumberStyles from "./TextFieldNumber.styles";

interface TextFieldNumberProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  fullWidth?: boolean;
}

interface TextFieldNumberState { }

class TextFieldNumber extends Component<
  TextFieldNumberProps & WithStyles<typeof TextFieldNumberStyles>,
  TextFieldNumberState
  > {
  constructor(
    props: TextFieldNumberProps & WithStyles<typeof TextFieldNumberStyles>
  ) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes, value, label, onChange, fullWidth, disabled } = this.props;
    return (
      <TextField
        variant="outlined"
        label={label}
        value={value}
        onChange={onChange}
        fullWidth={fullWidth}
        className={classes.textField}
        margin="dense"
        type="number"
        inputProps={{ min: "1", max: "20", step: "1" }}
        disabled={disabled}
        onFocus={event => {
          event.target.select()
        }}
      />
    );
  }
}

export default withStyles(TextFieldNumberStyles)(TextFieldNumber);
