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
  checkboxHidden?: boolean
  checkboxDisabled: boolean
  onEdit: boolean
  children: React.ReactNode
  RightIconButtons?: React.ReactNode[]
  classes?: {
    extra: string
  }
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
    checkboxHidden,
    onEdit,
    id,
    onChangeCheckbox,
    checkboxDisabled,
    name,
    extra,
    children,
    RightIconButtons,
    classes
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
                ) : !checkboxHidden ? (
                  <div className={styles.noCheckbox} />
                ) : null)}
              <Typography variant={'subtitle1'}>{name}</Typography>
            </div>
            <Typography
              variant={'subtitle1'}
              className={classes ? classes.extra : undefined}
            >
              {extra}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={styles.details}>
          {children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {RightIconButtons && RightIconButtons.map(Button => Button)}
    </div>
  )
}

export default ExpansionPanelItem
