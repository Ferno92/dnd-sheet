import React, { Component } from 'react'
import { WithStyles } from '@mui/styles'
import { TextField } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import TextFieldStringStyles from './TextFieldString.styles'
import clsx from 'clsx'

interface TextFieldStringProps {
  label: string
  name?: string
  value: string
  onChange: (value: string, property: string) => void
  disabled: boolean
  root?: string
  multiline?: boolean
}

interface TextFieldStringState {}

class TextFieldString extends Component<
  TextFieldStringProps & WithStyles<typeof TextFieldStringStyles>,
  TextFieldStringState
> {
  constructor(
    props: TextFieldStringProps & WithStyles<typeof TextFieldStringStyles>
  ) {
    super(props)

    this.state = {}
  }

  render() {
    const { classes, value, label, onChange, disabled, name, root, multiline } =
      this.props
    return (
      <TextField
        variant="outlined"
        label={label}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value, name ? name : '')
        }
        fullWidth
        className={clsx(classes.textField, root)}
        margin="dense"
        disabled={disabled}
        onFocus={(event) => {
          event.target.select()
        }}
        InputLabelProps={{
          className: classes.label,
        }}
        multiline={multiline}
      />
    )
  }
}

export default withStyles(TextFieldStringStyles)(TextFieldString)
