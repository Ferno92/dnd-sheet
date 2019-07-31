import React from 'react'
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem } from "@material-ui/core";
import { createRef, useState, useEffect } from "react";
import SimpleSelectStyles from "./SimpleSelect.styles";
import SimpleSelectItem from 'data/types/SimpleSelectItem';


interface SimpleSelectProps<T> {
    item?: T
    data: SimpleSelectItem[]
    label: string
    onEdit: boolean
    onChange(event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>): void
}

function SimpleSelect<T>(props: SimpleSelectProps<T>) {

    const { item, data, onEdit, onChange, label } = props
    const inputLabelRef = createRef<any>()
    const classes = SimpleSelectStyles()
    const [raceLabelWidth, setRaceLabelWidth] = useState(0)
    useEffect(() => {
        const current: any = inputLabelRef.current
        if (current) {
            setRaceLabelWidth(current.offsetWidth)
        }
    });

    return <FormControl variant="outlined" className={classes.raceInputField} fullWidth>
        <InputLabel htmlFor="outlined-select-simple" ref={inputLabelRef}>
            {label}
        </InputLabel>
        <Select
            value={item !== undefined ? item : ''}
            onChange={onChange}
            input={<OutlinedInput labelWidth={raceLabelWidth} name="race" id="outlined-select-simple" disabled={!onEdit} />}
            disabled={!onEdit}
        >
            {data.map(race => {
                return <MenuItem key={race.type} value={race.type}>{race.value}</MenuItem>
            })}
        </Select>
    </FormControl>
}
export default SimpleSelect