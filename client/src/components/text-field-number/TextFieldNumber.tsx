import React, { Component } from 'react'
import { WithStyles } from '@material-ui/styles'
import { withStyles, TextField } from '@material-ui/core'
import TextFieldNumberStyles from './TextFieldNumber.styles'
import clsx from 'clsx'

interface TextFieldNumberProps {
  label: string
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  fullWidth?: boolean
  min?: number
  max?: number
  root?: string
  step?: string
}

interface TextFieldNumberState {}

class TextFieldNumber extends Component<
  TextFieldNumberProps & WithStyles<typeof TextFieldNumberStyles>,
  TextFieldNumberState
> {
  static defaultProps = {
    min: 1,
    max: 20,
    step: '1'
  }

  constructor(
    props: TextFieldNumberProps & WithStyles<typeof TextFieldNumberStyles>
  ) {
    super(props)

    //TODO step 0.1 not working
    this.state = {}
  }

  render() {
    const {
      classes,
      value,
      label,
      onChange,
      fullWidth,
      disabled,
      min,
      max,
      root,
      step
    } = this.props
    return (
      <TextField
        variant="outlined"
        label={label}
        value={
          value === undefined || value.toString() === 'NaN' ? undefined : value
        }
        onChange={onChange}
        fullWidth={fullWidth}
        className={clsx(classes.textField, root)}
        margin="dense"
        type="number"
        inputProps={{ min: min, max: max, step: step }}
        disabled={disabled}
        onFocus={event => {
          event.target.select()
        }}
      />
    )
  }
}

export default withStyles(TextFieldNumberStyles)(TextFieldNumber)
