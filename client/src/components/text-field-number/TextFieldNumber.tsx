import React from 'react'
import { TextField } from '@material-ui/core'
import useStyles from './TextFieldNumber.styles'
import clsx from 'clsx'

export interface TextFieldNumberProps {
  label: string
  value: number | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  disabled: boolean
  fullWidth?: boolean
  min?: number
  max?: number
  root?: string
  step?: string
}

const TextFieldNumber: React.FC<TextFieldNumberProps> = (
  props: TextFieldNumberProps
) => {
  const {
    value,
    label,
    onChange,
    fullWidth,
    disabled,
    min = 1,
    max = 20,
    root,
    step = '1',
    onBlur
  } = props
  const styles = useStyles(props)
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value === undefined || value.toString() === 'NaN' ? '' : value}
      onChange={onChange}
      fullWidth={fullWidth}
      className={clsx(styles.textField, root)}
      margin="dense"
      type="number"
      inputProps={{ min: min, max: max, step: step }}
      InputLabelProps={{
        shrink: true
      }}
      disabled={disabled}
      onFocus={event => {
        event.target.select()
      }}
      onBlur={onBlur}
    />
  )
}

export default TextFieldNumber
