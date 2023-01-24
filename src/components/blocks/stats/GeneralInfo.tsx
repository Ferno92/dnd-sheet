import { Typography, Tooltip, IconButton } from '@material-ui/core'
import {
  Edit,
  FitnessCenter,
  Height,
  DateRange,
  Mood,
  Translate,
} from '@material-ui/icons'
import PgGeneralInfo from 'data/types/PgGeneralInfo'
import React from 'react'
import useStyles from './GeneralInfo.styles'

interface GeneralInfoProps {
  onEdit: boolean
  generalInfo: PgGeneralInfo | undefined
  getLanguages: () => String[]
  onEditGeneralInfo: () => void
}

const GeneralInfoComponent: React.FC<GeneralInfoProps> = (
  props: GeneralInfoProps
) => {
  const { onEdit, generalInfo, getLanguages, onEditGeneralInfo } = props
  const styles = useStyles()
  return (
    <>
      <div className={styles.generalInfo}>
        <Typography variant="subtitle1" color="textPrimary">
          Info generali
        </Typography>
        {onEdit && (
          <Tooltip title="Modifica info generali">
            <IconButton
              className={styles.generalInfoIcon}
              onClick={onEditGeneralInfo}
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <div className={styles.moreInfos}>
        <div className={styles.moreInfo}>
          <FitnessCenter className={styles.infoIcon} />
          <Typography variant="body1" color="textPrimary">{`${
            generalInfo ? generalInfo.weight : '__'
          } kg`}</Typography>
        </div>
        <div className={styles.moreInfo}>
          <Height className={styles.infoIcon} />
          <Typography variant="body1" color="textPrimary">{`${
            generalInfo ? generalInfo.height : '__'
          } m`}</Typography>
        </div>
        <div className={styles.moreInfo}>
          <DateRange className={styles.infoIcon} />
          <Typography variant="body1" color="textPrimary">{`${
            generalInfo ? generalInfo.age : '__'
          } anni`}</Typography>
        </div>
        <div className={styles.moreInfo}>
          <Mood className={styles.infoIcon} />
          <Typography variant="body1" color="textPrimary">{`${
            generalInfo ? generalInfo.alignment : 'Allineamento'
          }`}</Typography>
        </div>
        <div className={styles.moreInfo}>
          <Translate className={styles.infoIcon} />
          <Typography variant="body1" color="textPrimary">
            {getLanguages().length !== 0
              ? getLanguages().map(
                  (item, i) =>
                    `${item}${i !== getLanguages().length - 1 ? ', ' : ''}`
                )
              : 'Linguaggi'}
          </Typography>
        </div>
      </div>
    </>
  )
}

export default GeneralInfoComponent
