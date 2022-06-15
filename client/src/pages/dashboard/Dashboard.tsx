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
} from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import DashboardStyles from './Dashboard.styles'
import ConfirmDialog from 'components/confirm-dialog/ConfirmDialog'
import Skeleton from '@material-ui/lab/Skeleton'
import StatsUtils from 'utils/StatsUtils'
import LoginDialog from 'components/login-dialog/LoginDialog'
import BrightnessIcon from '@material-ui/icons/Brightness6'
import { ThemeContext } from 'index'
import { useGoogleOneTapLogin } from 'react-google-one-tap-login'
import { firebaseApp } from 'App'
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  setDoc,
} from 'firebase/firestore'

interface DashboardProps {}

interface GoogleUser {
  id: string | undefined
  picture: string | undefined
}

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
  const [user, setUser] = useState<GoogleUser>()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const classes = DashboardStyles()
  const { mode, setMode } = useContext(ThemeContext)

  useEffect(() => {
    //load only once
    const db = new Dexie('pg01_database')
    db.version(1).stores({
      pg: 'id,name,race,pgClass,level,stats',
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
      dbInstance.table('pg').delete(pgToDelete)
      const temp = [...pgs]
      const pgIndex = pgs.findIndex((pg) => pg.id)
      temp.splice(pgIndex, 1)
      setPGIds(temp)
      setPgToDelete(undefined)
    }
  }, [pgs, dbInstance, pgToDelete])

  const onLogin = useCallback(
    (profile?: BasicProfile) => {
      const googleUser = {
        id: profile?.getId(),
        picture: profile?.getImageUrl(),
      }
      setUser(googleUser)
      setShowLoginDialog(false)
      checkUserPgDatabase(googleUser)
    },
    [pgs]
  )

  const toggleDarkMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  useGoogleOneTapLogin({
    onError: (error) => console.log('GOOGLE ERR', error),
    onSuccess: (response) => {
      console.log('GOOGLE OK', response)
      setUser({
        id: response.aud,
        picture: response.picture,
      })
    },
    googleAccountConfigs: {
      client_id:
        '301028242623-nbso2movb7a8iuc4vd1oscanfnfh8m4g.apps.googleusercontent.com',
      callback: (args) => {
        console.log('CALLBACK', args)
      },
    },
  })

  const checkUserPgDatabase = useCallback(
    async (user: GoogleUser) => {
      console.log('checkUserPgDatabase', pgs)
      if (user.id) {
        const db = getFirestore(firebaseApp)
        const usersDocName = 'users'
        const response = await getDocs(collection(db, usersDocName))
        const userDoc = response.docs.find((doc) => doc.id == user?.id)?.data()
        if (userDoc == undefined) {
          const ref = doc(db, usersDocName, user?.id)
          setDoc(ref, {
            data: pgs.map((pg) => {
              return JSON.stringify(pg)
            }),
          })
            .then(() => {
              console.log('saved user pgs', user?.id)
            })
            .catch((error) => {
              console.log('db upload err: ', error)
            })
        } else {
          //check/download pgs
          setPGIds(
            (userDoc.data as string[]).map((pg) => {
              return JSON.parse(pg)
            })
          )
        }
      }
    },
    [pgs]
  )

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.loginButtonContainer}>
          <IconButton onClick={toggleDarkMode}>
            <BrightnessIcon />
          </IconButton>
        </div>
        <Typography variant="h5" className={classes.title}>
          I tuoi personaggi
        </Typography>
        <div className={classes.rightAction}>
          <IconButton onClick={() => setShowLoginDialog(true)}>
            <Avatar alt="User" src={user?.picture} />
          </IconButton>
        </div>
      </div>

      <div className={classes.list}>
        {loading
          ? [...Array(3).keys()].map((i) => {
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
                      ? `${pg.race} ${pg.pgClass} Lv. ${
                          pg.levelFirstClass || StatsUtils.getPgLevel(pg.pe) - 1
                        } - ${pg.pgClass2} Lv. ${
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
                    secondary: classes.listItemSecondaryText,
                  }}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Elimina personaggio">
                    <IconButton onClick={() => setPgToDelete(pg.id)}>
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
        user={undefined}
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={onLogin}
      />
    </div>
  )
}

export default withRouter(Dashboard)
