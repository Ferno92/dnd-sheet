import React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Checkbox
} from '@material-ui/core'
import useStyles from './ExpansionPanelItem.styles'
import { ExpandMore } from '@material-ui/icons'

interface ExpansionPanelItemProps {
  id: string
  name: string
  extra?: string
  expanded: boolean
  checked: boolean
  checkbox: boolean
  checkboxDisabled: boolean
  onEdit: boolean
  children: React.ReactNode
  RightIconButton?: React.ReactNode
  onExpand: () => void
  onChangeCheckbox: (id: string, checked: boolean) => void
}

const ExpansionPanelItem: React.FC<ExpansionPanelItemProps> = (
  props: ExpansionPanelItemProps
) => {
  const {
    expanded,
    onExpand,
    checked,
    checkbox,
    onEdit,
    id,
    onChangeCheckbox,
    checkboxDisabled,
    name,
    extra,
    children,
    RightIconButton
  } = props

  const styles = useStyles()

  return (
    <div
      className={styles.root}
      style={{
        alignItems: expanded ? 'flex-start' : 'center'
      }}
    >
      <ExpansionPanel
        square
        expanded={expanded}
        onChange={onExpand}
        className={styles.panel}
      >
        <ExpansionPanelSummary
          expandIcon={extra ? undefined : <ExpandMore />}
          className={checked ? styles.highlight : undefined}
        >
          <div className={styles.title}>
            <div className={styles.checkbox}>
              {onEdit &&
                (checkbox ? (
                  <Checkbox
                    checked={checked}
                    onChange={(
                      event: React.ChangeEvent<HTMLInputElement>,
                      checked: boolean
                    ) => onChangeCheckbox(id, checked)}
                    disabled={!onEdit || checkboxDisabled}
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <div className={styles.noCheckbox} />
                ))}
              <Typography variant={'subtitle1'}>{name}</Typography>
            </div>
            <Typography variant={'subtitle1'}>{extra}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={styles.details}>
          {children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {RightIconButton}
    </div>
  )
}

export default ExpansionPanelItem
