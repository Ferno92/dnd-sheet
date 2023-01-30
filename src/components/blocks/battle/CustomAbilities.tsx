import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  IconButton,
  Grid,
} from '@mui/material'
import { Add, Edit } from '@mui/icons-material'
import CustomAbilitiesDialog from 'components/dialogs/custom-abilities-dialog/CustomAbilitiesDialog'
import CustomAbility from 'pages/stats/models/CustomAbility'
import React, { useState } from 'react'
import shortid from 'shortid'
import useStyles from './CustomAbilities.styles'

interface CustomAbilitiesProps {
  customAbilities?: CustomAbility[]
  fullScreen: boolean
  onEdit: boolean
  onSave: (ability: CustomAbility) => void
  onDelete: (ability: CustomAbility) => void
}

const CustomAbilities: React.FC<CustomAbilitiesProps> = (
  props: CustomAbilitiesProps
) => {
  const { customAbilities, fullScreen, onSave, onDelete, onEdit } = props
  const [customAbilityExpanded, setCustomAbilityExpanded] = useState<string>()
  const [selected, setSelected] = useState<CustomAbility>()
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <Typography
          variant="subtitle1"
          className={styles.title}
          color="textPrimary"
        >
          Abilità aggiuntive
        </Typography>
        {onEdit && (
          <IconButton
            onClick={() => {
              setSelected({
                id: shortid.generate(),
                title: '',
                description: '',
              })
            }}
            size="large">
            <Add />
          </IconButton>
        )}
      </div>
      <Grid container>
        {customAbilities?.map((a) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={a.id}
              className={styles.item}
            >
              <Accordion
                square
                expanded={customAbilityExpanded === a.id}
                onChange={() =>
                  customAbilityExpanded === a.id
                    ? setCustomAbilityExpanded(undefined)
                    : setCustomAbilityExpanded(a.id)
                }
                className={styles.expandedItem}
              >
                <AccordionSummary>
                  <Typography variant="subtitle2" itemType="span">
                    {a.title}:
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" itemType="span">
                    {a.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              {onEdit && (
                <IconButton onClick={() => setSelected(a)} size="large">
                  <Edit />
                </IconButton>
              )}
            </Grid>
          );
        })}
      </Grid>
      {(customAbilities?.length === 0 ||
        customAbilities?.length === undefined) && (
        <Typography variant="body2" color="textPrimary">
          Nessuna abilità aggiuntiva
        </Typography>
      )}
      {selected && (
        <CustomAbilitiesDialog
          fullScreen={fullScreen}
          selected={selected}
          onClose={() => {
            setSelected(undefined)
          }}
          onSave={(a) => {
            onSave(a)
          }}
          onDelete={() => {
            onDelete(selected)
          }}
        />
      )}
    </div>
  );
}
export default CustomAbilities
