import React, { Component, createRef } from 'react'
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

interface StatsViewState {
  backgroundFromState: string
  showBackgroundItems: boolean
  generalInfoDialogOpen: boolean
  tempStatMode: boolean
  jobs: Job[]
  subjobs: Job[]
  races: Race[]
  subraces: Race[]
}

class StatsView extends Component<
  StatsViewProps & WithStyles<typeof StatsViewStyles>,
  StatsViewState
> {
  inputLabel = createRef<any>()
  backgroundData = DataUtils.BackgroundMapper(backgroundJSON as any)
  abilitiesData = DataUtils.AbilityMapper(abilitiesJSON as any)

  constructor(props: StatsViewProps & WithStyles<typeof StatsViewStyles>) {
    super(props)

    this.state = {
      backgroundFromState: props.pg.background,
      showBackgroundItems: false,
      generalInfoDialogOpen: false,
      tempStatMode:
        props.pg.stats.find((stat) => stat.temp !== undefined) !== undefined,
      jobs: [],
      subjobs: [],
      races: [],
      subraces: [],
    }
  }

  componentWillReceiveProps(newProps: StatsViewProps) {
    const { backgroundFromState, tempStatMode } = this.state
    if (newProps.pg.background !== backgroundFromState) {
      this.setState({ backgroundFromState: newProps.pg.background })
    }
    if (
      newProps.pg.stats.filter((stat) => stat.temp === undefined).length !==
        6 &&
      !tempStatMode
    ) {
      this.setState({ tempStatMode: true })
    }
  }

  async componentDidMount() {
    const jobs = await DataUtils.getJobs(firebaseApp)
    const subjobs = await DataUtils.getSubJobs(firebaseApp)
    const races = await DataUtils.getRaces(firebaseApp)
    const subraces = await DataUtils.getSubRaces(firebaseApp)
    this.setState({ jobs, subjobs, races, subraces })
  }

  getAbilitiesListFromClass = (): AbilitiesEnum[] => {
    const { pgClass } = this.props.pg
    const { jobs } = this.state
    let abilitiesList: AbilitiesEnum[] = []
    if (pgClass) {
      jobs.forEach((job) => {
        if (job.type === pgClass) {
          abilitiesList = job.abilities
        }
      })
    }
    return abilitiesList
  }

  getEquipListFromBackground = (): EquipmentObject[] => {
    const { background } = this.props.pg
    let eqList: EquipmentObject[] = []
    if (background) {
      this.backgroundData.forEach((data) => {
        if (data.type === background) {
          eqList = data.equip
        }
      })
    }
    return eqList
  }

  addItemFromBG = () => {
    const { onAddEquipment } = this.props
    const items = this.getEquipListFromBackground()
    onAddEquipment(items)

    this.setState({ showBackgroundItems: false })
  }

  getLanguages = () => {
    const { generalInfo, race } = this.props.pg
    const { races } = this.state
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
  }

  render() {
    const { pgClass, stats, generalInfo } = this.props.pg
    const {
      classes,
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
    } = this.props
    const {
      backgroundFromState,
      showBackgroundItems,
      generalInfoDialogOpen,
      jobs,
      races,
    } = this.state

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )

    const width = useWidth()
    return (
      <div className={classes.container}>
        <div className={classes.inputContainer}>
          <ResumeComponent
            width={width}
            pg={this.props.pg}
            races={races}
            jobs={jobs}
            subraces={this.state.subraces}
            onEdit={onEdit}
            subjobs={this.state.subjobs}
            backgroundFromState={backgroundFromState}
            backgroundData={this.backgroundData}
            onChangeJob={onChangeJob}
            onChangeSubJob={onChangeSubJob}
            onChangeBackground={(e, child) => {
              this.setState({ showBackgroundItems: true })
              this.props.onChangeBackground(e, child)
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
            getLanguages={this.getLanguages}
            onEditGeneralInfo={() => {
              console.log('open general info')
              this.setState({ generalInfoDialogOpen: true })
            }}
          />
          <Divider className={classes.divider} />
          <LevelComponent
            pg={this.props.pg}
            rootCss={classes.gridContainer}
            gridItemCss={classes.gridItem}
            proficiency={proficiency}
            pgClass={pgClass}
            races={races}
            onEdit={onEdit}
            onChangePE={onChangePE}
            onChangeIspiration={onChangeIspiration}
          />
          <Divider className={classes.divider} />

          <StatsComponent
            titleCss={classes.title}
            gridContainerCss={classes.gridContainer}
            gridItemCss={classes.gridItem}
            onEdit={onEdit}
            pg={this.props.pg}
            onEditStats={onEditStats}
          />

          <Divider className={classes.divider} />

          <TsComponent
            titleCss={classes.title}
            gridContainerCss={classes.gridContainer}
            tsPositiveCss={classes.tsPositive}
            tsNegativeCss={classes.tsNegative}
            onEdit={onEdit}
            stats={stats}
            pg={this.props.pg}
            proficiency={proficiency}
            jobs={jobs}
            onEditStats={onEditStats}
          />

          <Divider className={classes.divider} />

          <AbilitiesComponent
            onEdit={onEdit}
            pg={this.props.pg}
            jobs={jobs}
            races={races}
            backgroundData={this.backgroundData}
            abilitiesData={this.abilitiesData}
            proficiency={proficiency}
            titleCss={classes.title}
            gridContainerCss={classes.gridContainer}
            tsPositiveCss={classes.tsPositive}
            tsNegativeCss={classes.tsNegative}
            getAbilitiesListFromClass={this.getAbilitiesListFromClass}
            onChangeAbilityCheck={onChangeAbilityCheck}
            onChangeAbilityPoints={onChangeAbilityPoints}
          />

          <Divider className={classes.divider} />
          {readOnly && <div className={classes.readOnly}></div>}
        </div>
        <Dialog
          open={showBackgroundItems}
          onClose={() => {
            this.setState({ showBackgroundItems: false })
          }}
          fullScreen={isMobile}
        >
          <DialogTitle className={classes.bgTitle}>
            Oggetti di background
          </DialogTitle>
          <DialogContent className={classes.bgContent}>
            <DialogContentText>
              Il background che hai selezionato comprende questi oggetti per
              partire. Vuoi aggiungerli al tuo zaino?
            </DialogContentText>
            {this.getEquipListFromBackground().map((eq, index) => {
              return (
                <div className={classes.backgroundEqListItem} key={index}>
                  <Typography
                    variant="body2"
                    className={clsx(
                      classes.quantity,
                      eq.quantity === 1 || eq.name.indexOf('{0}') !== -1
                        ? classes.invisibleQuantity
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
                this.setState({ showBackgroundItems: false })
              }}
            >
              No
            </Button>
            <Button onClick={this.addItemFromBG}>Aggiungi</Button>
          </DialogActions>
        </Dialog>
        <GeneralInfoDialog
          pg={this.props.pg}
          open={generalInfoDialogOpen}
          onClose={() => this.setState({ generalInfoDialogOpen: false })}
          fullscreen={true}
          onSave={this.props.onChangeGeneralInfo}
        />
      </div>
    )
  }
}

export default withStyles(StatsViewStyles)(StatsView)

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
