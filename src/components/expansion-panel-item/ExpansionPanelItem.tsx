import React from 'react'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Checkbox,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import clsx from 'clsx'
import useStyles from './ExpansionPanelItem.styles'

interface AccordionItemProps {
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

const AccordionItem: React.FC<AccordionItemProps> = (
  props: AccordionItemProps
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
    classes,
  } = props

  const styles = useStyles()

  return (
    <div
      className={clsx(
        styles.root,
        RightIconButtons !== undefined ? styles.withButtons : ''
      )}
      style={{
        alignItems: expanded ? 'flex-start' : 'center',
      }}
    >
      <Accordion
        square
        expanded={expanded}
        onChange={onExpand}
        className={styles.panel}
      >
        <AccordionSummary
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
                    onClick={(e) => e.stopPropagation()}
                    color="primary"
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
        </AccordionSummary>
        <AccordionDetails className={styles.details}>
          {children}
        </AccordionDetails>
      </Accordion>
      {RightIconButtons && RightIconButtons.map((Button) => Button)}
    </div>
  )
}

export default AccordionItem
