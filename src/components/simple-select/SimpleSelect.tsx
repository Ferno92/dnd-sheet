import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  ListSubheader,
  SelectChangeEvent,
} from '@mui/material'
import { createRef, useState, useEffect } from 'react'
import SimpleSelectStyles from './SimpleSelect.styles'
import SimpleSelectItem from 'data/types/SimpleSelectItem'
import clsx from 'clsx'

interface SimpleSelectProps<T> {
  item?: T
  data: SimpleSelectItem[]
  label: string
  onEdit: boolean
  root?: string
  onChange(event: SelectChangeEvent<T>, child: React.ReactNode): void
}

function SimpleSelect<T>(props: SimpleSelectProps<T>) {
  const { item, data: dataList, onEdit, onChange, label, root } = props
  const inputLabelRef = createRef<any>()
  const classes = SimpleSelectStyles()
  /*
  const [labelWidth, setLabelWidth] = useState(0)
  useEffect(() => {
    const current: any = inputLabelRef.current
    if (current) {
      setLabelWidth(current.offsetWidth)
    }
  }, [inputLabelRef])
*/
  return (
    <FormControl
      variant="outlined"
      className={clsx(classes.raceInputField, root)}
      fullWidth
    >
      <InputLabel
        htmlFor="outlined-select-simple"
        ref={inputLabelRef}
        className={classes.label}
      >
        {label}
      </InputLabel>
      <Select
        value={item !== undefined ? item : ''}
        onChange={onChange}
        input={
          <OutlinedInput
            //labelWidth={labelWidth}
            name="race"
            id="outlined-select-simple"
            disabled={!onEdit}
          />
        }
        disabled={!onEdit}
      >
        {dataList.map((data) => {
          return data.type.toString() === 'SubHeader' ? (
            <ListSubheader key={data.type + data.value}>
              {data.value}
            </ListSubheader>
          ) : (
            <MenuItem
              key={data.type}
              value={data.type}
              disabled={data.disabled}
            >
              {`${data.value}${data.extra ? ` (${data.extra})` : ''}`}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
export default SimpleSelect
