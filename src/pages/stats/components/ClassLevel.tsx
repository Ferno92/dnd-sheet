import React from 'react'
import { IconButton, Typography } from '@mui/material'
import { Remove, Add } from '@mui/icons-material'
import useStyles from './ClassLevel.styles'

export interface ClassLevelProps {
  level: number
  max: number
  readOnly: boolean
  onRemove: () => void
  onAdd: () => void
}

const ClassLevel: React.FC<ClassLevelProps> = (props: ClassLevelProps) => {
  const { level, onRemove, onAdd, max, readOnly } = props
  const styles = useStyles(props)

  return (
    <div className={styles.root}>
      {!readOnly && (
        <IconButton
          onClick={onRemove}
          className={styles.iconButton}
          disabled={level <= 1}
          size="large">
          <Remove />
        </IconButton>
      )}
      <Typography
        className={styles.label}
        variant="body1"
      >{`LV. ${level}`}</Typography>
      {!readOnly && (
        <IconButton
          onClick={onAdd}
          className={styles.iconButton}
          disabled={level >= max - 1}
          size="large">
          <Add />
        </IconButton>
      )}
    </div>
  );
}

export default ClassLevel
