import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  IconButton,
} from '@material-ui/core'
import { Add, Edit } from '@material-ui/icons'
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
    <div>
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
          >
            <Add />
          </IconButton>
        )}
      </div>
      {customAbilities?.map((a) => {
        return (
          <div key={a.id} className={styles.item}>
            <ExpansionPanel
              square
              expanded={customAbilityExpanded === a.id}
              onChange={() =>
                customAbilityExpanded === a.id
                  ? setCustomAbilityExpanded(undefined)
                  : setCustomAbilityExpanded(a.id)
              }
              className={styles.expandedItem}
            >
              <ExpansionPanelSummary>
                <Typography variant="subtitle2" itemType="span">
                  {a.title}:
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="body2" itemType="span">
                  {a.description}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {onEdit && (
              <IconButton onClick={() => setSelected(a)}>
                <Edit />
              </IconButton>
            )}
          </div>
        )
      })}
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
  )
}
export default CustomAbilities
