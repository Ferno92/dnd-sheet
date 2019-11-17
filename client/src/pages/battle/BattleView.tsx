import React, { useState, useCallback, useEffect } from 'react'
import BattleViewStyles from './BattleView.styles'
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  ListItem,
  List,
  IconButton,
  Grid,
  Checkbox
} from '@material-ui/core'
import StatsType from 'data/types/StatsEnum'
import { useTheme } from '@material-ui/core/styles'
import { Close, Check, Remove, Add } from '@material-ui/icons'
import TextFieldNumber from 'components/text-field-number/TextFieldNumber'
import TextFieldString from 'components/text-field-string/TextFieldString'
import PG from 'pages/stats/models/PG'
import SizeEnum from 'data/types/SizeEnum'
import StatsUtils from 'utils/StatsUtils'
import clsx from 'clsx'
import BattleUtils from 'utils/BattleUtils'
import WeaponDialog from 'components/weapon-dialog/WeaponDialog'
import Weapon from 'data/types/Weapon'
import WeaponInfo from 'data/types/WeaponInfo'
import ArmorInfo from 'data/types/ArmorInfo'
import ArmorDialog from 'components/armor-dialog/ArmorDialog'
import Armor from 'data/types/Armor'
import { RacesEnum, SubRacesEnum } from 'data/types/RacesEnum'
import { default as racesJSON } from 'data/json/RacesJSON'
import DataUtils from 'data/DataUtils'
import RaceAbility from 'data/types/RaceAbility'

export interface Modifier {
  type: string
  value: number
  canDelete: boolean
}

interface BattleViewProps {
  onEdit: boolean
  id: number
  pg: PG
  onChangeSpeed: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangePF: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeTsMorte: (index: number) => void
  onChangeCurrentPf: (add: number) => void
  onAddWeapon: (bonus: number, notes: string, weapon?: Weapon) => void
  onAddArmor: (bonus: number, notes: string, armor?: Armor) => void
  onRemoveWeapon: (index: number) => void
  onRemoveArmor: (index: number) => void
}

function BattleView(props: BattleViewProps) {
  const {
    onEdit,
    pg,
    onChangeSpeed,
    onChangePF,
    onChangeTsMorte,
    onChangeCurrentPf,
    onAddWeapon,
    onAddArmor,
    onRemoveWeapon,
    onRemoveArmor
  } = props
  const classes = BattleViewStyles()
  const [caModifiersOpen, setCaModifiersOpen] = useState(false)
  const [dv, setDV] = useState(0)
  const [weaponDialogOpen, setWeaponDialogOpen] = useState(false)
  const [armorDialogOpen, setArmorDialogOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  let defaultModifiers = [
    {
      type: StatsType.Destrezza as string,
      value: StatsUtils.getStatModifier(
        pg.stats.find(stat => stat.type === StatsType.Destrezza)!,
        pg
      ),
      canDelete: false
    }
  ]

  if (StatsUtils.getRaceSize(pg) === SizeEnum.Piccola) {
    defaultModifiers.push({ type: 'Taglia', value: 1, canDelete: false })
  }

  const getCA = useCallback(() => {
    let count = 0
    const { armors } = props.pg
    armors.forEach(armorInfo => {
      //TODO if armor missing add 10
      count += armorInfo.armor.ca + armorInfo.bonus
      if (armorInfo.armor.addDes) {
        count += StatsUtils.getStatModifier(
          pg.stats.find(stat => stat.type === StatsType.Destrezza)!,
          pg
        )
      }
    })
    return count < 10 ? count + 10 : count
  }, [pg, props.pg])

  const showCAmodifiers = useCallback(() => {
    setCaModifiersOpen(true)
  }, [])

  const getPFColorClass = useCallback(() => {
    let className = ''
    if (pg.currentPF > pg.pfTot) {
      className = 'blue'
    } else if (pg.currentPF !== pg.pfTot) {
      if (pg.currentPF >= pg.pfTot / 2) {
        className = 'green'
      } else if (pg.currentPF >= pg.pfTot / 4) {
        className = 'yellow'
      } else if (pg.currentPF < pg.pfTot / 4) {
        className = 'red'
      }
    }

    return className
  }, [pg])

  const getWeaponTPC = useCallback(
    (weaponInfo: WeaponInfo) => {
      const { level, pgClass } = pg
      let tpc = weaponInfo.bonus + StatsUtils.getProficiency(level, pgClass)
      if (
        weaponInfo.weapon.property.find(property => property === 'Accurata')
      ) {
        //TODO get higher from Des or For
      } else {
        tpc += StatsUtils.getStatModifierFromName(StatsType.Forza, pg)
      }
      return `${tpc >= 0 ? '+' : '-'}${tpc}`
    },
    [pg]
  )

  const getWeaponDamageBonus = useCallback(
    (weaponInfo: WeaponInfo) => {
      let damage = weaponInfo.bonus
      if (
        weaponInfo.weapon.property.find(property => property === 'Accurata')
      ) {
        //TODO get higher from Des or For
      } else {
        damage += StatsUtils.getStatModifierFromName(StatsType.Forza, pg)
      }
      return damage
    },
    [pg]
  )

  const getRaceAbilities = useCallback(
    (race: RacesEnum, subRace?: SubRacesEnum) => {
      let raceAbilities: RaceAbility[] = []
      const racesData = DataUtils.RaceMapper(racesJSON as any)
      racesData.forEach(raceData => {
        if (raceData.type === race.toString()) {
          raceAbilities.push.apply(raceAbilities, raceData.abilities)
        }
      })
      return raceAbilities
    },
    []
  )

  useEffect(() => {
    setDV(BattleUtils.getDV(pg.pgClass))
  }, [pg.race, pg.pgClass])

  const raceAbilities = getRaceAbilities(pg.race, pg.subRace)
  return (
    <div className={classes.container}>
      <Typography variant="h6" className={classes.title}>
        Combattimento
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4} className={classes.gridItem}>
          <Button
            variant="outlined"
            className={classes.caContainer}
            onClick={showCAmodifiers}
          >
            <div className={classes.caTitle}>CA</div>
            <div className={classes.caValue}>{getCA()}</div>
          </Button>
        </Grid>
        <Grid item xs={4} className={classes.gridItem}>
          <TextFieldNumber
            disabled
            label={'Iniziativa'}
            value={StatsUtils.getStatValue(StatsType.Destrezza, pg)}
            onChange={() => {}}
          />
        </Grid>

        <Grid item xs={4} className={clsx(classes.gridItem, classes.speed)}>
          <TextFieldNumber
            disabled={!onEdit}
            label={'Velocità(m)'}
            value={pg.speed && pg.speed !== '' ? parseFloat(pg.speed) : 0}
            onChange={onChangeSpeed}
            min={0}
            max={150}
            step={'1.5'}
          />
        </Grid>
        <Grid item xs={4} className={classes.gridItem}>
          <TextFieldNumber
            disabled={!onEdit}
            label={'PF Tot'}
            value={pg.pfTot}
            onChange={onChangePF}
            min={0}
            max={999}
          />
        </Grid>

        <Grid item xs={4} className={classes.gridItem}>
          <TextFieldString
            disabled
            label={'Dado vita'}
            value={`d${dv}`}
            onChange={() => {}}
          />
        </Grid>

        <Grid item xs={4} className={classes.gridItem}>
          <div className={classes.tsContainer}>
            <span>TS vs Morte</span>
            <div className={classes.flexRow}>
              <span className={classes.tslabel}>S</span>
              <div className={classes.checkboxContainer}>
                <Checkbox
                  className={classes.checkbox}
                  checkedIcon={<Check />}
                  checked={pg.tsMorte[0]}
                  onChange={() => onChangeTsMorte(0)}
                  disabled={onEdit}
                />
                <Checkbox
                  className={classes.checkbox}
                  checkedIcon={<Check />}
                  checked={pg.tsMorte[1]}
                  onChange={() => onChangeTsMorte(1)}
                  disabled={onEdit}
                />
                <Checkbox
                  className={classes.checkbox}
                  checkedIcon={<Check />}
                  checked={pg.tsMorte[2]}
                  onChange={() => onChangeTsMorte(2)}
                  disabled={onEdit}
                />
              </div>
            </div>
            <div className={classes.flexRow}>
              <span className={classes.tslabel}>F</span>
              <div className={classes.checkboxContainer}>
                <Checkbox
                  className={classes.checkbox}
                  checkedIcon={<Close />}
                  checked={pg.tsMorte[3]}
                  onChange={() => onChangeTsMorte(3)}
                  disabled={onEdit}
                />
                <Checkbox
                  className={classes.checkbox}
                  checkedIcon={<Close />}
                  checked={pg.tsMorte[4]}
                  onChange={() => onChangeTsMorte(4)}
                  disabled={onEdit}
                />
                <Checkbox
                  className={classes.checkbox}
                  checkedIcon={<Close />}
                  checked={pg.tsMorte[5]}
                  onChange={() => onChangeTsMorte(5)}
                  disabled={onEdit}
                />
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="subtitle2">PF Attuali</Typography>
          <div className={classes.pfContainer}>
            <IconButton disabled={onEdit} onClick={() => onChangeCurrentPf(-1)}>
              <Remove />
            </IconButton>
            <div className={classes.pf}>
              <span className={clsx(classes.currentPf, getPFColorClass())}>
                {pg.currentPF}
              </span>
              <span>{`/${pg.pfTot}`}</span>
            </div>
            <IconButton disabled={onEdit} onClick={() => onChangeCurrentPf(1)}>
              <Add />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      {/* ________________ Armor sections _____________ */}
      <Typography variant="subtitle2" className={classes.weaponTitle}>
        Armature e scudi
      </Typography>
      {pg.armors.length > 0 && (
        <Grid container className={classes.weaponHeader}>
          <Grid item xs={6}>
            Nome
          </Grid>
          <Grid item xs={2}>
            CA
          </Grid>
          <Grid item xs={3}>
            Tipologia
          </Grid>
        </Grid>
      )}

      <Grid container>
        {pg.armors.map((armorInfo: ArmorInfo, index: number) => {
          return (
            <React.Fragment key={index}>
              <Grid
                item
                xs={6}
                className={clsx(classes.weaponGridItem, classes.weaponName)}
              >
                {`${armorInfo.armor.name}${
                  armorInfo.bonus ? `(+${armorInfo.bonus})` : ''
                }`}
              </Grid>
              <Grid item xs={2} className={classes.weaponGridItem}>
                {armorInfo.armor.ca + armorInfo.bonus}
              </Grid>
              <Grid item xs={3} className={classes.weaponGridItem}>
                {armorInfo.armor.armorType}
              </Grid>

              <Grid item xs={1} className={classes.weaponGridItem}>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() => onRemoveArmor(index)}
                >
                  <Close className={classes.weaponInfoButton} />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={12}
                className={clsx(classes.weaponGridItem, classes.weaponInfo)}
              >
                {armorInfo.notes && <div>{armorInfo.notes}</div>}
              </Grid>
            </React.Fragment>
          )
        })}
      </Grid>
      <Button
        className={classes.dialogActionButton}
        onClick={() => setArmorDialogOpen(!armorDialogOpen)}
      >
        <Add /> Aggiungi armatura o scudo
      </Button>

      {/* ________________ Armor dialog _____________ */}
      <ArmorDialog
        open={armorDialogOpen}
        fullScreen={fullScreen}
        onClose={() => setArmorDialogOpen(false)}
        onAddArmor={onAddArmor}
      />

      {/* ________________ Weapon sections _____________ */}
      <Typography variant="subtitle2" className={classes.weaponTitle}>
        Armi
      </Typography>
      {pg.weapons.length > 0 && (
        <Grid container className={classes.weaponHeader}>
          <Grid item xs={3}>
            Nome
          </Grid>
          <Grid item xs={2}>
            TPC
          </Grid>
          <Grid item xs={3}>
            Danno
          </Grid>
          <Grid item xs={3}>
            Tipologia
          </Grid>
        </Grid>
      )}

      <Grid container>
        {pg.weapons.map((weaponInfo: WeaponInfo, index: number) => {
          return (
            <React.Fragment key={index}>
              <Grid
                item
                xs={3}
                className={clsx(classes.weaponGridItem, classes.weaponName)}
              >
                {`${weaponInfo.weapon.name}${
                  weaponInfo.bonus ? `(+${weaponInfo.bonus})` : ''
                }`}
              </Grid>
              <Grid item xs={2} className={classes.weaponGridItem}>
                {getWeaponTPC(weaponInfo)}
              </Grid>
              <Grid item xs={3} className={classes.weaponGridItem}>{`${
                weaponInfo.weapon.damage
              }+${getWeaponDamageBonus(weaponInfo)}`}</Grid>
              <Grid item xs={3} className={classes.weaponGridItem}>
                {weaponInfo.weapon.damageType}
              </Grid>

              <Grid item xs={1} className={classes.weaponGridItem}>
                <IconButton
                  size="small"
                  color="secondary"
                  onClick={() => onRemoveWeapon(index)}
                >
                  <Close className={classes.weaponInfoButton} />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={12}
                className={clsx(classes.weaponGridItem, classes.weaponInfo)}
              >
                {weaponInfo.notes && <div>{weaponInfo.notes}</div>}
                <div>
                  {weaponInfo.weapon.property.map(property => property)}
                </div>
              </Grid>
            </React.Fragment>
          )
        })}
      </Grid>
      <Button
        className={classes.dialogActionButton}
        onClick={() => setWeaponDialogOpen(!weaponDialogOpen)}
      >
        <Add /> Aggiungi arma
      </Button>

      {/* ________________ Abilità speciali di razza _____________ */}
      <Typography variant="subtitle1" className={classes.weaponTitle}>
        Abilità razziali
      </Typography>
      {raceAbilities.map(raceAbility => {
        return (
          //TODO description in dialog?
          <React.Fragment key={raceAbility.name}>
            <Typography variant="subtitle2" itemType="span">
              {raceAbility.name}:
            </Typography>
            <Typography variant="body1" itemType="span">
              {raceAbility.description}
            </Typography>
          </React.Fragment>
        )
      })}

      {/* ________________ Abilità speciali di classe _____________ */}

      {/* ________________ Weapon dialog _____________ */}
      <WeaponDialog
        open={weaponDialogOpen}
        fullScreen={fullScreen}
        onClose={() => setWeaponDialogOpen(false)}
        onAddWeapon={onAddWeapon}
      />

      {/* ________________ CA dialog _____________ */}
      <Dialog
        fullScreen={fullScreen}
        open={caModifiersOpen}
        onClose={() => setCaModifiersOpen(false)}
        aria-labelledby="responsive-dialog-title"
        className={classes.dialogRoot}
      >
        <DialogContent>
          <DialogTitle className={classes.dialogTitle}>
            <Typography>Modificatori CA:</Typography>
            <IconButton
              className={classes.closeDialog}
              onClick={() => setCaModifiersOpen(false)}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <List>
            {pg.armors.map((armorInfo: ArmorInfo, index: number) => {
              return (
                <ListItem key={index} className={classes.listItem}>
                  <Typography variant="subtitle1" itemType="span">
                    {armorInfo.armor.name}
                  </Typography>
                  <Typography variant="body1" itemType="span">
                    {armorInfo.armor.ca + armorInfo.bonus}
                  </Typography>
                  <Typography variant="body1" itemType="span">
                    +
                  </Typography>
                </ListItem>
              )
            })}

            <ListItem className={classes.listItem}>
              <Typography variant="subtitle1" itemType="span">
                Destrezza
              </Typography>
              <Typography variant="body1" itemType="span">
                {StatsUtils.getStatModifier(
                  pg.stats.find(stat => stat.type === StatsType.Destrezza)!,
                  pg
                )}
              </Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
              <div>TOT</div>
              <div>{getCA()}</div>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BattleView
