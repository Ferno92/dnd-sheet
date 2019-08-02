import React from 'react'
import BattleViewStyles from './BattleView.styles';
import { Typography } from '@material-ui/core';
import MixedInput, { InputPosition } from 'components/mixed-input/MixedInput';
import StatsType from 'data/types/StatsEnum';

interface BattleViewProps {
    onEdit: boolean
    id: number
}

function BattleView(props: BattleViewProps) {
    const { onEdit } = props
    const classes = BattleViewStyles()

    const caModifiers = [
        { type: 'Armature', value: 0 },
        { type: StatsType.Destrezza, value: 2 },
        { type: 'Base', value: 10 },
    ]
    //if taglia != da media +1/-1
    return (
        <div className={classes.container}>
            <Typography variant='h6' className={classes.title}>Classe Armatura</Typography>
            <MixedInput
                inputInfo={{ type: 'Altro', value: 0 }}
                inputPos={InputPosition.End}
                modifiers={caModifiers}
                onChange={() => { }}
                onEdit={onEdit}
                label={'CA'}
                sign={false}
            />
        </div>
    )
}

export default BattleView