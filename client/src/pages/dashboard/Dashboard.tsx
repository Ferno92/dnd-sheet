import React, { useState, useEffect, useCallback, useContext } from 'react'
import Dexie from 'dexie'
import PG from 'pages/stats/models/PG'
import { Add, Delete } from '@material-ui/icons'
import { ReactComponent as OrcIcon } from 'assets/images/orc.svg'
import {
  Typography,
  Fab,
  Avatar,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
  Tooltip,
  Button
} from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import DashboardStyles from './Dashboard.styles'
import ConfirmDialog from 'components/confirm-dialog/ConfirmDialog'
import Skeleton from '@material-ui/lab/Skeleton'
import StatsUtils from 'utils/StatsUtils'
import LoginDialog from 'components/login-dialog/LoginDialog'
import BrightnessIcon from '@material-ui/icons/Brightness6'
import { ThemeContext } from 'index'

interface DashboardProps {}

export interface BasicProfile {
  getId(): string
  getEmail(): string
  getName(): string
  getGivenName(): string
  getFamilyName(): string
  getImageUrl(): string
}

function Dashboard(props: DashboardProps & RouteComponentProps) {
  // Declare a new state variable, which we'll call "count"
  const [pgs, setPGIds] = useState<PG[]>([])
  const [pgToDelete, setPgToDelete] = useState<number>()
  const [dbInstance, setDbInstance] = useState<Dexie>()
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<BasicProfile>()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const classes = DashboardStyles()
  const {mode, setMode} = useContext(ThemeContext)

  useEffect(() => {
    //load only once
    const db = new Dexie('pg01_database')
    db.version(1).stores({
      pg: 'id,name,race,pgClass,level,stats'
    })
    db.open().then(() => {
      const pgTable = db.table('pg')
      let pgList: PG[] = []
      pgTable
        .each((pg: PG) => {
          pgList.push(pg)
        })
        .then(() => {
          setPGIds(pgList)
          setLoading(false)
        })
    })
    setDbInstance(db)
  }, [])

  const addPG = () => {
    props.history.push(`/sheet/${pgs.length + 1}/0`, { isNew: true })
  }

  const getFirstLetters = (name: string): string => {
    var matches = name.match(/\b(\w)/g) // ['J','S','O','N']
    return matches ? matches.join('') : '' // JSON
  }

  const onDeleteItem = useCallback(() => {
    if (dbInstance && pgToDelete !== undefined) {
      dbInstance.table('pg').delete(pgToDelete + 1)
      const temp = [...pgs]
      temp.splice(pgToDelete, 1)
      setPGIds(temp)
      setPgToDelete(undefined)
    }
  }, [pgs, dbInstance, pgToDelete])

  const onLogin = useCallback((profile?: BasicProfile) => {
    setUser(profile)
    setShowLoginDialog(false)
  }, [])

  const toggleDarkMode = ()=> {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.loginButtonContainer}>
          <Button
            onClick={() => setShowLoginDialog(true)}
            variant="outlined"
            className={classes.loginButton}
          >
            {user ? `Ciao ${user.getGivenName()}` : 'Login'}
          </Button>
          <IconButton onClick={toggleDarkMode}><BrightnessIcon/></IconButton>
        </div>
        <Typography variant="h5" className={classes.title}>
          I tuoi personaggi
        </Typography>
        <div className={classes.rightAction} />
      </div>

      <div className={classes.list}>
        {loading
          ? [...Array(3).keys()].map(i => {
              return (
                <div className={classes.skeletonContainer} key={i}>
                  <Skeleton variant="circle" height={50} width={50} />
                  <div className={classes.skeletonInfo}>
                    <Skeleton
                      variant="rect"
                      height={24}
                      width={200}
                      className={classes.skeleton}
                    />
                    <Skeleton variant="rect" height={16} width={160} />
                  </div>
                </div>
              )
            })
          : pgs.map((pg: PG, i: number) => (
              <ListItem
                key={pg.id}
                dense
                button
                onClick={() => props.history.push(`/sheet/${pg.id}/${0}`)}
                className={classes.item}
              >
                <ListItemIcon>
                  <Avatar className={classes.avatar} src={pg.image}>
                    {pg.image ? '' : getFirstLetters(pg.name)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={pg.name}
                  secondary={
                    pg.multiclass && pg.pgClass2
                      ? `${pg.race} ${pg.pgClass} Lv. ${pg.levelFirstClass ||
                          StatsUtils.getPgLevel(pg.pe) - 1} - ${
                          pg.pgClass2
                        } Lv. ${
                          pg.levelFirstClass
                            ? StatsUtils.getPgLevel(pg.pe) - pg.levelFirstClass
                            : 1
                        }`
                      : `${pg.race || ''} ${pg.pgClass || ''} ${
                          pg.pgClass ? `Lv.${StatsUtils.getPgLevel(pg.pe)}` : ''
                        }`
                  }
                  classes={{
                    primary: classes.listItemText,
                    secondary: classes.listItemSecondaryText
                  }}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Elimina personaggio">
                    <IconButton onClick={() => setPgToDelete(i)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
      </div>
      {pgs.length === 0 && (
        <div className={classes.emptyDescription}>
          <OrcIcon />
          <Typography variant="body1">
            Non hai ancora dei personaggi, creane subito uno!
          </Typography>
        </div>
      )}

      <Tooltip title="Crea nuovo personaggio">
        <Fab
          color="primary"
          aria-label="Add"
          size="medium"
          onClick={addPG}
          className={classes.fab}
        >
          <Add />
        </Fab>
      </Tooltip>

      <ConfirmDialog
        open={pgToDelete !== undefined}
        title={'Elimina'}
        description={'Sei sicuro di voler eliminare questo pg?'}
        noCallback={() => setPgToDelete(undefined)}
        yesCallback={onDeleteItem}
      />

      <LoginDialog
        user={user}
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={onLogin}
      />
    </div>
  )
}

export default withRouter(Dashboard)
