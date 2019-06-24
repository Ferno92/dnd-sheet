import React, { Component } from "react";
import { WithStyles } from "@material-ui/styles";
import { withStyles, Typography, TextField, Grid } from "@material-ui/core";
import TextFieldStringStyles from "./TextFieldString.styles";

interface TextFieldStringProps {
    label: string
    value: string
    onChange: (value: string , property: string)  => void
    disabled: boolean;
}

interface TextFieldStringState {
    
}

class TextFieldString extends Component<
TextFieldStringProps & WithStyles<typeof TextFieldStringStyles>,
TextFieldStringState
> {
  constructor(props: TextFieldStringProps & WithStyles<typeof TextFieldStringStyles>) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { classes, value, label, onChange, disabled } = this.props;
    return (
        <TextField
              variant="outlined"
              label={label}
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange.bind(event.target.value, "name")}
              fullWidth
              className={classes.textField}
              margin="dense"
              disabled={disabled}
            />
    );
  }
}

export default withStyles(TextFieldStringStyles)(TextFieldString);
