import React, { Component } from "react";
import { WithStyles } from "@material-ui/styles";
import { withStyles, TextField } from "@material-ui/core";
import TextFieldStringStyles from "./TextFieldString.styles";
import clsx from 'clsx';

interface TextFieldStringProps {
  label: string
  name?: string
  value: string
  onChange: (value: string, property: string) => void
  disabled: boolean;
  root?: string
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
    const { classes, value, label, onChange, disabled, name, root } = this.props;
    return (
      <TextField
        variant="outlined"
        label={label}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value, name ? name : '')}
        fullWidth
        className={clsx(classes.textField, root)}
        margin="dense"
        disabled={disabled}
        onFocus={event => {
          event.target.select()
        }}
        InputLabelProps={{
          className: classes.label
        }}
      />
    );
  }
}

export default withStyles(TextFieldStringStyles)(TextFieldString);
