import {
  Avatar,
  Checkbox,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  IconButton,
  Typography,
  SelectChangeEvent,
} from '@mui/material'
import { Breakpoint } from '@mui/material/styles'
import { AccountCircle, Edit, ExpandMore } from '@mui/icons-material'
import clsx from 'clsx'
import SimpleSelect from 'components/simple-select/SimpleSelect'
import TextFieldString from 'components/text-field-string/TextFieldString'
import Background from 'data/types/Background'
import Job from 'data/types/Job'
import { JobsEnum, SubJobsEnum } from 'data/types/JobsEnum'
import Race from 'data/types/Race'
import { RacesEnum, SubRacesEnum } from 'data/types/RacesEnum'
import StatsType from 'data/types/StatsEnum'
import ClassLevel from 'pages/stats/components/ClassLevel'
import PG from 'pages/stats/models/PG'
import React, { useCallback, useState } from 'react'
import StatsUtils from 'utils/StatsUtils'
import useStyles from './resume.styles'
import ImageCompressor from 'image-compressor.js'

interface ResumeComponentProps {
  width: Breakpoint
  pg: PG
  races: Race[]
  jobs: Job[]
  subraces: Race[]
  onEdit: boolean
  subjobs: Job[]
  backgroundFromState: string
  backgroundData: Background[]
  onChangeJob: (job: JobsEnum, secondary?: boolean) => void
  onChangeSubJob: (job: SubJobsEnum, secondary?: boolean) => void
  onChangeBackground: <T extends string>(
    event: SelectChangeEvent<T>,
    child: React.ReactNode
  ) => void
  onChangeRace: <T extends string>(
    event: SelectChangeEvent<T>,
    child: React.ReactNode
  ) => void
  onChangeSubRace: <T extends string>(
    event: SelectChangeEvent<T>,
    child: React.ReactNode
  ) => void
  onChangeMulticlass: (multi: boolean) => void
  onEditName: (value: string) => void
  onChangeImage: (url: string) => void
  onUpdateFirstClassLevel: (level: number) => void
}

const ResumeComponent: React.FC<ResumeComponentProps> = (
  props: ResumeComponentProps
) => {
  const {
    name,
    race,
    pgClass,
    subRace,
    image,
    subClass,
    multiclass,
    pgClass2,
    subClass2,
    levelFirstClass,
    pe,
  } = props.pg
  const {
    onChangeJob,
    onChangeSubJob,
    onChangeRace,
    onChangeSubRace,
    onChangeBackground,
    onChangeMulticlass,
    onEditName,
    onChangeImage,
    onUpdateFirstClassLevel,
    width,
    races,
    jobs,
    subraces,
    onEdit,
    subjobs,
    backgroundFromState,
    backgroundData,
  } = props
  const styles = useStyles()
  const [infoExpanded, setInfoExpanded] = useState(false)

  const getSubRacesData = useCallback(() => {
    const { race } = props.pg
    const filtered = subraces.filter(
      (subRace) => subRace.type.indexOf(race.toString().toLowerCase()) >= 0
    )
    return filtered || ''
  }, [props, subraces])

  const imageCompressCallback = useCallback(
    (file: File) => {
      var reader = new FileReader()
      reader.onload = (e: any) => {
        if (e.target) {
          onChangeImage(e.target.result)
        }
      }
      reader.readAsDataURL(file)
    },
    [onChangeImage]
  )

  const inputImageCallback = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (evt && evt.target && evt.target.files) {
        const imageFile = evt.target.files[0]
        if (imageFile && imageFile.type.indexOf('image/') !== -1) {
          new ImageCompressor(imageFile, {
            quality: 0.5,
            success: imageCompressCallback,
          })
        } else {
          //TODO error
          // store.dispatch(showMessageAction("error", "Seleziona un immagine."));
        }
      }
    },
    [imageCompressCallback]
  )

  const onEditAvatar = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation()

      const editFabs = document.getElementsByClassName('hidden-input')
      const editFab = editFabs[0] as HTMLInputElement
      editFab.click()
    },
    []
  )

  const onAddLevel = useCallback(
    (first: boolean) => {
      let level = StatsUtils.getPgLevel(pe) - 1
      if (levelFirstClass) {
        level = levelFirstClass + 1
      }
      onUpdateFirstClassLevel(level)
    },
    [levelFirstClass, pe, onUpdateFirstClassLevel]
  )

  const onRemoveLevel = useCallback(
    (first: boolean) => {
      let level = StatsUtils.getPgLevel(pe) - 2
      if (levelFirstClass && levelFirstClass > 1) {
        level = levelFirstClass - 1
      }
      onUpdateFirstClassLevel(level)
    },
    [levelFirstClass, pe, onUpdateFirstClassLevel]
  )

  const getSubJobsData = useCallback(() => {
    if (pgClass) {
      const filtered = subjobs.filter(
        (subJob) =>
          subJob.type.toLowerCase().indexOf(pgClass.toString().toLowerCase()) >=
          0
      )
      return filtered
    } else {
      return []
    }
  }, [subjobs, pgClass])

  const getJobRequirement = useCallback(
    (job: JobsEnum) => {
      const race = races.find((r) => r.type === props.pg.race.toString())
      const minStatValue = 13
      if (race) {
        let requirement: string | undefined = ''
        const statValue = StatsUtils.getStatValue(
          StatsType.Forza,
          props.pg,
          race,
          subraces
        )
        switch (job) {
          case JobsEnum.Barbaro:
            requirement =
              statValue < minStatValue ? `Forza ${minStatValue}` : undefined
            break
          case JobsEnum.Bardo:
            requirement =
              statValue < minStatValue ? `Carisma ${minStatValue}` : undefined
            break
          case JobsEnum.Chierico:
            requirement =
              statValue < minStatValue ? `Saggezza ${minStatValue}` : undefined
            break
          case JobsEnum.Druido:
            requirement =
              statValue < minStatValue ? `Saggezza ${minStatValue}` : undefined
            break
          case JobsEnum.Guerriero:
            if (statValue < minStatValue) {
              requirement = `Forza ${minStatValue}`
            }
            if (statValue < minStatValue) {
              requirement +=
                requirement === ''
                  ? `Destrezza ${minStatValue}`
                  : `, Destrezza ${minStatValue}`
            }
            break
          case JobsEnum.Ladro:
            requirement =
              statValue < minStatValue ? `Destrezza ${minStatValue}` : undefined
            break
          case JobsEnum.Mago:
            requirement =
              statValue < minStatValue
                ? `Intelligenza ${minStatValue}`
                : undefined
            break
          case JobsEnum.Monaco:
            if (statValue < minStatValue) {
              requirement = `Destrezza ${minStatValue}`
            }
            if (statValue < minStatValue) {
              requirement +=
                requirement === ''
                  ? `Saggezza ${minStatValue}`
                  : `, Saggezza ${minStatValue}`
            }
            break
          case JobsEnum.Paladino:
            if (statValue < minStatValue) {
              requirement = `Forza ${minStatValue}`
            }
            if (statValue < minStatValue) {
              requirement +=
                requirement === ''
                  ? `Carisma ${minStatValue}`
                  : `, Carisma ${minStatValue}`
            }
            break
          case JobsEnum.Ranger:
            if (statValue < minStatValue) {
              requirement = `Destrezza ${minStatValue}`
            }
            if (statValue < minStatValue) {
              requirement +=
                requirement === ''
                  ? `Saggezza ${minStatValue}`
                  : `, Saggezza ${minStatValue}`
            }
            break
          case JobsEnum.Stregone:
            requirement =
              statValue < minStatValue ? `Carisma ${minStatValue}` : undefined
            break
          case JobsEnum.Warlock:
            requirement =
              statValue < minStatValue ? `Carisma ${minStatValue}` : undefined
            break
        }

        return requirement
      } else {
        return undefined
      }
    },
    [props.pg, races, subraces]
  )

  const getSecondaryJobsData = useCallback((): Job[] => {
    const filtered: Job[] = jobs.filter((job) => job.type !== pgClass)
    const mapped: Job[] = filtered.map((x) => {
      const req = getJobRequirement(x.type as JobsEnum)
      return {
        ...x,
        disabled: req !== undefined,
        extra: req ? req : undefined,
      } as Job
    })
    return mapped || []
  }, [jobs, pgClass, getJobRequirement])

  const getSecondarySubJobsData = useCallback(() => {
    if (pgClass2) {
      const filtered = subjobs.filter(
        (subJob) =>
          subJob.type
            .toLowerCase()
            .indexOf(pgClass2.toString().toLowerCase()) >= 0
      )
      return filtered
    } else {
      return []
    }
  }, [pgClass2, subjobs])

  const infoReadOnly = (
    <div className={styles.infoReadOnly}>
      <Typography
        variant={width === 'xs' || width === 'sm' ? 'body1' : 'h2'}
        color="textPrimary"
      >
        {name || ''}
      </Typography>
      <Typography
        variant="body2"
        color="textPrimary"
      >{`${StatsUtils.getInfoName(`${race}`, races)} ${StatsUtils.getInfoName(
        `${subRace}`,
        getSubRacesData()
      )}`}</Typography>
      {multiclass && pgClass && pgClass2 ? (
        <Typography variant="body2" color="textPrimary">
          {StatsUtils.getInfoName(`${pgClass}`, jobs)
            ? `${pgClass} Lv. ${
                levelFirstClass || StatsUtils.getPgLevel(props.pg.pe) - 1
              } - ${pgClass2} Lv. ${
                levelFirstClass
                  ? StatsUtils.getPgLevel(props.pg.pe) - levelFirstClass
                  : 1
              }`
            : ''}
        </Typography>
      ) : (
        <Typography variant="body2" color="textPrimary">
          {StatsUtils.getInfoName(`${pgClass}`, jobs)
            ? `${StatsUtils.getInfoName(
                `${pgClass}`,
                jobs
              )} Lv. ${StatsUtils.getPgLevel(props.pg.pe)}`
            : ''}
        </Typography>
      )}
    </div>
  )
  const summary = (
    <div className={styles.infoSummary}>
      <div className={styles.infoAvatar}>
        <Avatar
          className={styles.avatar}
          src={image}
          style={{ opacity: onEdit ? 0.5 : 1 }}
        >
          {!image && (
            <AccountCircle className={styles.emptyImage} color="secondary" />
          )}
        </Avatar>
        <input
          className="hidden-input"
          accept="image/*"
          type="file"
          style={{ display: 'none' }}
          onChange={inputImageCallback}
        />
        {onEdit && (
          <IconButton
            className={styles.editAvatar}
            onClick={onEditAvatar}
            size="large"
          >
            <Edit />
          </IconButton>
        )}
      </div>
      {width === 'xs' || width === 'sm' ? infoReadOnly : undefined}
    </div>
  )
  const panelDetail = (
    <React.Fragment>
      <TextFieldString
        label="Nome Personaggio"
        value={name}
        onChange={onEditName}
        disabled={!onEdit}
        name={'name'}
        root={styles.infoDetailsItem}
      />
      <SimpleSelect<RacesEnum>
        label={'Razza'}
        item={race}
        data={races}
        onEdit={onEdit}
        onChange={onChangeRace}
        root={styles.infoDetailsItem}
      />
      {race &&
        (StatsUtils.getCurrentRace(race, races)?.subraces || []).length > 0 && (
          <SimpleSelect<SubRacesEnum>
            label={'Sotto-razza'}
            item={subRace}
            data={getSubRacesData()}
            onEdit={onEdit}
            onChange={onChangeSubRace}
            root={styles.infoDetailsItem}
          />
        )}
      {onEdit && StatsUtils.getPgLevel(props.pg.pe) !== 1 && (
        <FormControlLabel
          className={clsx(styles.multiclass, styles.infoDetailsItem)}
          control={
            <Checkbox
              checked={multiclass || false}
              onChange={() => onChangeMulticlass(!multiclass)}
            />
          }
          label={'Multiclasse'}
        />
      )}
      <div
        className={clsx(
          styles.multiLevelContainer,
          multiclass ? styles.multiLevelContainerOnEdit : undefined
        )}
      >
        <SimpleSelect<JobsEnum>
          label={multiclass ? 'Classe Primaria' : 'Classe'}
          item={pgClass}
          data={jobs}
          onEdit={onEdit}
          onChange={(e) => onChangeJob(e.target.value as JobsEnum)}
          root={multiclass ? styles.infoDetailsItem : undefined}
        />
        {multiclass && pgClass && (
          <ClassLevel
            level={levelFirstClass || StatsUtils.getPgLevel(props.pg.pe) - 1}
            max={StatsUtils.getPgLevel(props.pg.pe)}
            onAdd={() => onAddLevel(true)}
            onRemove={() => onRemoveLevel(true)}
            readOnly={!onEdit}
          />
        )}
      </div>
      {pgClass && (
        <SimpleSelect<SubJobsEnum>
          label={multiclass ? 'Specializzazione Primaria' : 'Specializzazione'}
          item={subClass}
          data={getSubJobsData()}
          onEdit={onEdit}
          onChange={(e) => onChangeSubJob(e.target.value as SubJobsEnum)}
          root={styles.infoDetailsItem}
        />
      )}
      {multiclass && (
        <React.Fragment>
          <div
            className={clsx(
              styles.multiLevelContainer,
              multiclass ? styles.multiLevelContainerOnEdit : undefined
            )}
          >
            <SimpleSelect<JobsEnum>
              label={'Classe Secondaria'}
              item={pgClass2}
              data={getSecondaryJobsData()}
              onEdit={onEdit}
              onChange={(e) => onChangeJob(e.target.value as JobsEnum, true)}
              root={multiclass ? styles.infoDetailsItem : undefined}
            />
            {pgClass2 && (
              <Typography
                variant="body1"
                className={styles.secondClassLevel}
              >{`LV. ${
                StatsUtils.getPgLevel(props.pg.pe) -
                (props.pg.levelFirstClass ||
                  StatsUtils.getPgLevel(props.pg.pe) - 1)
              }`}</Typography>
            )}
          </div>
          {pgClass2 && (
            <SimpleSelect<SubJobsEnum>
              label={'Specializzazione Secondaria'}
              item={subClass2}
              data={getSecondarySubJobsData()}
              onEdit={onEdit}
              onChange={(e) =>
                onChangeSubJob(e.target.value as SubJobsEnum, true)
              }
              root={styles.infoDetailsItem}
            />
          )}
        </React.Fragment>
      )}
      <SimpleSelect<string>
        label={'Background'}
        item={backgroundFromState}
        data={backgroundData}
        onEdit={onEdit}
        onChange={onChangeBackground}
        root={styles.infoDetailsItem}
      />{' '}
    </React.Fragment>
  )

  return (
    <>
      {width === 'xs' || width === 'sm' ? (
        <Accordion
          square
          expanded={infoExpanded}
          onChange={() => setInfoExpanded(!infoExpanded)}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            {summary}
          </AccordionSummary>
          <AccordionDetails className={styles.infoDetails}>
            {panelDetail}
          </AccordionDetails>
        </Accordion>
      ) : (
        <div>
          {infoReadOnly}
          <div className={styles.infoBigScreen}>
            {summary}
            <div className={styles.infoBigPanelDetail}>{panelDetail}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default ResumeComponent
