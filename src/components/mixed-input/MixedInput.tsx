import React from 'react'
import MixedInputStyles from './MixedInput.styles'
import { Add, DragHandle } from '@mui/icons-material'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import { Typography } from '@mui/material'

interface Modifier {
  type: string
  value?: number
  min?: number
  max?: number
}

export enum InputPosition {
  Start,
  End
}

interface MixedInputProps {
  modifiers: Modifier[]
  inputPos: InputPosition
  inputInfo?: Modifier
  onChange: (value: number) => void
  onEdit: boolean
  label?: string
  labelOnTop?: boolean
  sign?: boolean
}

function MixedInput(props: MixedInputProps) {
  const classes = MixedInputStyles()
  const {
    modifiers,
    inputPos,
    inputInfo,
    onChange,
    onEdit,
    label,
    labelOnTop,
    sign = true
  } = props

  const getTotal = () => {
    let count = 0
    modifiers.forEach(modifier => {
      count += modifier.value ? modifier.value : 0
    })
    if (inputInfo) {
      count += inputInfo.value ? inputInfo.value : 0
    }

    return `${count === 0 ? '' : sign ? (count > 0 ? '+' : '-') : ''}${Math.abs(
      count
    )}`
  }

  return (
    <div className={classes.mixedInputContainer}>
      {labelOnTop && (
        <Typography variant="body1" className={classes.labelOnTop} color='textPrimary'>
          {label}
        </Typography>
      )}
      <div className={classes.mixedInput}>
        <div
          className={classes.flex}
          style={{
            flexDirection:
              inputPos === InputPosition.Start ? 'row' : 'row-reverse'
          }}
        >
          {inputInfo && (
            <div className={classes.fieldContainer}>
              <TextFieldNumber
                label={inputInfo.type}
                value={inputInfo.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  onChange(parseInt(event.target.value))
                }}
                disabled={!onEdit}
                min={inputInfo.min || 0}
                max={inputInfo.max || 100}
                step={'1'}
              />
            </div>
          )}

          {inputPos === InputPosition.End && (
            <Add className={classes.operation} />
          )}
          {modifiers.map((modifier, index) => {
            return (
              <div className={classes.flex} key={`modifier-${modifier.type}`}>
                {inputPos === InputPosition.End &&
                index === modifiers.length - 1 ? (
                  ''
                ) : (
                  <Add className={classes.operation} />
                )}
                <div className={classes.modifier}>
                  <Typography
                    variant="caption"
                    className={classes.modifierType}
                    color='textPrimary'
                  >
                    {modifier.type}
                  </Typography>
                  <div className={classes.modifierValue}>{modifier.value}</div>
                </div>
              </div>
            )
          })}
        </div>
        <DragHandle className={classes.operation} />
        <div className={classes.modifier}>
          {labelOnTop ? (
            ''
          ) : (
            <Typography variant="caption" className={classes.label}  color='textPrimary'>
              {label ? label.toUpperCase() : ''}
            </Typography>
          )}
          <div className={classes.modifierValue}>{getTotal()}</div>
        </div>
      </div>
    </div>
  )
}

export default MixedInput
