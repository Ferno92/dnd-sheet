import React from "react";
import MixedInputStyles from "./MixedInput.styles";
import { Add, DragHandle } from "@material-ui/icons";
import TextFieldNumber from "components/text-field-number/TextFieldNumber";

interface Modifier {
    type: string,
    value: number
}

export enum InputPosition {
    Start,
    End
}

interface MixedInputProps {
    modifiers: Modifier[]
    inputPos: InputPosition
    inputInfo: Modifier
    onChange: (value: number) => void
    onEdit: boolean,
    label: string
}

function MixedInput(props: MixedInputProps) {
    const classes = MixedInputStyles()
    const { modifiers, inputPos, inputInfo, onChange, onEdit, label } = props

    const getTotal = () => {
        let count = 0
        modifiers.forEach(modifier => {
            count += modifier.value
        })
        count += inputInfo.value

        return `${count === 0 ? '' : (count > 0 ? '+' : '-')}${Math.abs(count)}`
    }


    return (
        <div className={classes.mixedInput}>
            <div className={classes.flex}
                style={{ flexDirection: inputPos === InputPosition.Start ? 'row' : 'row-reverse' }}>
                <div className={classes.fieldContainer}>
                    <TextFieldNumber
                        label={inputInfo.type}
                        value={inputInfo.value}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            onChange(parseInt(event.target.value))
                        }}
                        disabled={!onEdit}
                    />
                </div>
                {inputPos === InputPosition.End && (<Add className={classes.operation} />)}
                {modifiers.map((modifier, index) => {
                    return (
                        <div className={classes.flex} key={`modifier-${modifier.type}`}>
                            {inputPos === InputPosition.End && index === modifiers.length - 1 ? '' : <Add className={classes.operation} />}
                            <div className={classes.modifier}>
                                <div className={classes.modifierType}>{modifier.type}</div>
                                <div className={classes.modifierValue}>{modifier.value}</div>
                            </div>
                        </div>
                    )
                })
                }
            </div>
            <DragHandle className={classes.operation} />
            <div className={classes.modifier}>
                <div className={classes.modifierType}>{label}</div>
                <div className={classes.modifierValue}>{getTotal()}</div>
            </div>
        </div>
    )
}

export default MixedInput