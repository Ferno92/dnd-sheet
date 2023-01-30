import React, {
  Component,
  createRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { WithStyles } from '@mui/styles'
import {
  Typography,
  Divider,
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Breakpoint,
  Theme,
  useMediaQuery,
  useTheme,
  SelectChangeEvent,
} from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import StatsViewStyles from './StatsView.styles'
import PG from './models/PG'
import { default as abilitiesJSON } from 'data/json/AbilitiesJSON'
import { default as backgroundJSON } from 'data/json/BackgroundJSON'
import DataUtils from 'data/DataUtils'
import { JobsEnum, SubJobsEnum } from 'data/types/JobsEnum'
import AbilitiesEnum from 'data/types/AbilitiesEnum'
import EquipmentObject from 'pages/equipment/EquipmentObject'
import clsx from 'clsx'
import GeneralInfoDialog from 'components/general-info-dialog/GeneralInfoDialog'
import PgGeneralInfo from 'data/types/PgGeneralInfo'
import Job from 'data/types/Job'
import { firebaseApp } from 'App'
import Race from 'data/types/Race'
import ResumeComponent from 'components/blocks/stats/resume'
import GeneralInfoComponent from 'components/blocks/stats/GeneralInfo'
import LevelComponent from 'components/blocks/stats/LevelComponent'
import StatsComponent from 'components/blocks/stats/StatsComponent'
import TsComponent from 'components/blocks/stats/TsComponent'
import AbilitiesComponent from 'components/blocks/stats/AbilitiesComponent'
import { Proficiency } from 'utils/StatsUtils'
import useStyles from './StatsView.styles'

interface StatsViewProps {
  onEdit: boolean
  id: number
  pg: PG
  proficiency: Proficiency[]
  exist: boolean
  readOnly: boolean
  onEditName: (value: string) => void
  onEditLevel: (lv: number) => void
  onEditStats: (
    prop: number,
    value?: string,
    temp?: boolean,
    tsTemp?: boolean
  ) => void
  onChangeRace: <T extends string>(
    event: SelectChangeEvent<T>,
    child: React.ReactNode
  ) => void
  onChangeSubRace: <T extends string>(
    event: SelectChangeEvent<T>,
    child: React.ReactNode
  ) => void
  onChangeJob: (job: JobsEnum, secondary?: boolean) => void
  onChangeSubJob: (job: SubJobsEnum, secondary?: boolean) => void
  onChangeBackground: <T extends string>(
    event: SelectChangeEvent<T>,
    child: React.ReactNode
  ) => void
  onChangeAbilityCheck: (type: AbilitiesEnum, checked: boolean) => void
  onChangeAbilityPoints: (type: AbilitiesEnum, value: number) => void
  onChangeIspiration: (checked: boolean) => void
  onChangeImage: (url: string) => void
  onChangePE: (value: number) => void
  onAddEquipment: (equipments: EquipmentObject[]) => void
  onChangeGeneralInfo: (info: PgGeneralInfo) => void
  onChangeMulticlass: (multi: boolean) => void
  onUpdateFirstClassLevel: (level: number) => void
}

const StatsView: React.FC<StatsViewProps> = (props: StatsViewProps) => {
  const { pgClass, stats, generalInfo } = props.pg
  const {
    onEdit,
    onChangeAbilityCheck,
    onChangeAbilityPoints,
    onChangeIspiration,
    onChangeJob,
    onChangeSubJob,
    onChangeRace,
    onChangeSubRace,
    onEditName,
    onEditStats,
    onChangePE,
    onChangeMulticlass,
    onChangeImage,
    onUpdateFirstClassLevel,
    proficiency,
    readOnly,
    pg,
    onAddEquipment,
  } = props
  const inputLabel = createRef<any>()
  const backgroundData = DataUtils.BackgroundMapper(backgroundJSON as any)
  const abilitiesData = DataUtils.AbilityMapper(abilitiesJSON as any)
  const [backgroundFromState, setBackgroundFromState] = useState(pg.background)
  const [showBackgroundItems, setShowBackgroundItems] = useState(false)
  const [generalInfoDialogOpen, setGeneralInfoDialogOpen] = useState(false)
  const [tempStatMode, setTempStatMode] = useState(
    props.pg.stats.find((stat) => stat.temp !== undefined) !== undefined
  )
  const [jobs, setJobs] = useState<Job[]>([])
  const [subjobs, setSubJobs] = useState<Job[]>([])
  const [races, setRaces] = useState<Race[]>([])
  const [subraces, setSubRaces] = useState<Race[]>([])
  const styles = useStyles()

  const getEquipListFromBackground = useCallback((): EquipmentObject[] => {
    const { background } = pg
    let eqList: EquipmentObject[] = []
    if (background) {
      backgroundData.forEach((data) => {
        if (data.type === background) {
          eqList = data.equip
        }
      })
    }
    return eqList
  }, [backgroundData, pg])

  const addItemFromBG = useCallback(() => {
    const items = getEquipListFromBackground()
    onAddEquipment(items)
    setShowBackgroundItems(false)
  }, [getEquipListFromBackground, onAddEquipment])

  const getLanguages = useCallback(() => {
    const { generalInfo, race } = pg
    let languages: string[] = []
    races.forEach((data) => {
      if (data.type === race.toString()) {
        data.abilities.forEach((item) => {
          if (item.extra) {
            const splitted = item.extra.split('|')
            if (splitted[0] === 'languages') {
              const obj = JSON.parse(splitted[1])
              if (obj.list) {
                languages = languages.concat(obj.list)
              }
            }
          }
        })
      }
    })
    if (generalInfo) {
      //from generalInfo and from raceAbility
      languages = languages.concat(generalInfo.languages || [])
    }
    return languages
  }, [pg, races])

  useEffect(() => {
    const fetchData = async () => {
      setJobs(await DataUtils.getJobs(firebaseApp))
      setSubJobs(await DataUtils.getSubJobs(firebaseApp))
      setRaces(await DataUtils.getRaces(firebaseApp))
      setSubRaces(await DataUtils.getSubRaces(firebaseApp))
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (pg.background !== backgroundFromState) {
      setBackgroundFromState(pg.background)
    }
    if (
      pg.stats.filter((stat) => stat.temp === undefined).length !== 6 &&
      !tempStatMode
    ) {
      setTempStatMode(true)
    }
  }, [backgroundFromState, pg.background, pg.stats, tempStatMode])

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  const width = useWidth()

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <ResumeComponent
          width={width}
          pg={pg}
          races={races}
          jobs={jobs}
          subraces={subraces}
          onEdit={onEdit}
          subjobs={subjobs}
          backgroundFromState={backgroundFromState}
          backgroundData={backgroundData}
          onChangeJob={onChangeJob}
          onChangeSubJob={onChangeSubJob}
          onChangeBackground={(e, child) => {
            setShowBackgroundItems(true)
            props.onChangeBackground(e, child)
          }}
          onChangeRace={onChangeRace}
          onChangeSubRace={onChangeSubRace}
          onChangeMulticlass={onChangeMulticlass}
          onEditName={onEditName}
          onChangeImage={onChangeImage}
          onUpdateFirstClassLevel={onUpdateFirstClassLevel}
        />
        <GeneralInfoComponent
          onEdit={onEdit}
          generalInfo={generalInfo}
          getLanguages={getLanguages}
          onEditGeneralInfo={() => {
            console.log('open general info')
            setGeneralInfoDialogOpen(true)
          }}
        />
        <Divider className={styles.divider} />
        <LevelComponent
          pg={props.pg}
          rootCss={styles.gridContainer}
          gridItemCss={styles.gridItem}
          proficiency={proficiency}
          pgClass={pgClass}
          races={races}
          onEdit={onEdit}
          onChangePE={onChangePE}
          onChangeIspiration={onChangeIspiration}
        />
        <Divider className={styles.divider} />

        <StatsComponent
          titleCss={styles.title}
          gridContainerCss={styles.gridContainer}
          gridItemCss={styles.gridItem}
          onEdit={onEdit}
          pg={props.pg}
          onEditStats={onEditStats}
        />

        <Divider className={styles.divider} />

        <TsComponent
          titleCss={styles.title}
          gridContainerCss={styles.gridContainer}
          tsPositiveCss={styles.tsPositive}
          tsNegativeCss={styles.tsNegative}
          onEdit={onEdit}
          stats={stats}
          pg={props.pg}
          proficiency={proficiency}
          jobs={jobs}
          onEditStats={onEditStats}
        />

        <Divider className={styles.divider} />

        <AbilitiesComponent
          onEdit={onEdit}
          pg={props.pg}
          jobs={jobs}
          races={races}
          backgroundData={backgroundData}
          abilitiesData={abilitiesData}
          proficiency={proficiency}
          titleCss={styles.title}
          gridContainerCss={styles.gridContainer}
          tsPositiveCss={styles.tsPositive}
          tsNegativeCss={styles.tsNegative}
          onChangeAbilityCheck={onChangeAbilityCheck}
          onChangeAbilityPoints={onChangeAbilityPoints}
        />

        <Divider className={styles.divider} />
        {readOnly && <div className={styles.readOnly}></div>}
      </div>
      <Dialog
        open={showBackgroundItems}
        onClose={() => {
          setShowBackgroundItems(false)
        }}
        fullScreen={isMobile}
      >
        <DialogTitle className={styles.bgTitle}>
          Oggetti di background
        </DialogTitle>
        <DialogContent className={styles.bgContent}>
          <DialogContentText>
            Il background che hai selezionato comprende questi oggetti per
            partire. Vuoi aggiungerli al tuo zaino?
          </DialogContentText>
          {getEquipListFromBackground().map((eq, index) => {
            return (
              <div className={styles.backgroundEqListItem} key={index}>
                <Typography
                  variant="body2"
                  className={clsx(
                    styles.quantity,
                    eq.quantity === 1 || eq.name.indexOf('{0}') !== -1
                      ? styles.invisibleQuantity
                      : undefined
                  )}
                >
                  {eq.quantity}
                </Typography>
                <Typography variant={'body2'}>
                  {eq.name
                    .replace('{0}', eq.quantity.toString())
                    .replace('{1}', eq.id)}
                </Typography>
              </div>
            )
          })}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowBackgroundItems(false)
            }}
          >
            No
          </Button>
          <Button onClick={addItemFromBG}>Aggiungi</Button>
        </DialogActions>
      </Dialog>
      <GeneralInfoDialog
        pg={props.pg}
        open={generalInfoDialogOpen}
        onClose={() => setGeneralInfoDialogOpen(false)}
        fullscreen={true}
        onSave={props.onChangeGeneralInfo}
      />
    </div>
  )
}
export default StatsView

type BreakpointOrNull = Breakpoint | null

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
function useWidth() {
  const theme: Theme = useTheme()
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse()
  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || 'xs'
  )
}
