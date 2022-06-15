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

export interface GoogleUser {
  id: string | undefined
  name: string | undefined
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
  const [oneTapLoginDisabled, setOneTapLoginDisabled] = useState(true)
  const classes = DashboardStyles()
  const { mode, setMode } = useContext(ThemeContext)

  useEffect(() => {
    //load only once
    const db = new Dexie('pg01_database')
    db.version(1).stores({
      pg: 'id,name,race,pgClass,level,stats',
    })
    db.version(2).stores({
      pg: 'id,name,race,pgClass,level,stats',
      user: 'id,name, picture',
    })
    setDbInstance(db)
    fetchUserDatabase(db)
  }, [])

  const fetchUserDatabase = useCallback(
    (db: Dexie) => {
      db.open().then(() => {
        const userTable = db.table('user')
        let user: GoogleUser | undefined = undefined
        userTable
          .each((googleUser: GoogleUser) => {
            user = googleUser
          })
          .then(() => {
            setUser(user)

            if (user) {
              clearPgDatabase()
              checkUserPgDatabase(user, false, db)
            } else {
              fetchPgDatabase(db)
            }
            setOneTapLoginDisabled(false)
          })
      })
    },
    [dbInstance]
  )

  const fetchPgDatabase = (db: Dexie) => {
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
  }

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
      setOneTapLoginDisabled(true)
      setShowLoginDialog(false)
      const googleUser = {
        id: profile?.getId(),
        name: profile?.getName(),
        picture: profile?.getImageUrl(),
      }
      setUser(googleUser)
      checkUserPgDatabase(googleUser, true, dbInstance)
      setOneTapLoginDisabled(false)
    },
    [pgs, dbInstance]
  )

  const onLogout = useCallback(() => {
    dbInstance?.table('user').delete(user?.id)
    setShowLoginDialog(false)
    setUser(undefined)
    setPGIds([])
    clearPgDatabase()
    setOneTapLoginDisabled(true)
  }, [user])

  const toggleDarkMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  useGoogleOneTapLogin({
    onError: (error) => console.log('GOOGLE ERR', error),
    onSuccess: (response) => {
      console.log('GOOGLE OK', response)
      const newUser = {
        id: response.sub,
        name: response.name,
        picture: response.picture,
      }
      setUser(newUser)
      checkUserPgDatabase(newUser, true, dbInstance)
    },
    googleAccountConfigs: {
      client_id:
        '301028242623-nbso2movb7a8iuc4vd1oscanfnfh8m4g.apps.googleusercontent.com',
    },
    disabled: oneTapLoginDisabled || user != undefined || showLoginDialog,
  })

  const checkUserPgDatabase = useCallback(
    async (user: GoogleUser, loggingIn: boolean, db: Dexie | undefined) => {
      console.log('checkUserPgDatabase', pgs)
      if (user.id) {
        if (loggingIn) {
          //save user in db
          db?.table('user').put(user)
        }
        const firebaseDb = getFirestore(firebaseApp)
        const usersDocName = 'users'
        const response = await getDocs(collection(firebaseDb, usersDocName))
        const userDoc = response.docs.find((doc) => doc.id == user?.id)?.data()
        if (userDoc == undefined) {
          const ref = doc(firebaseDb, usersDocName, user?.id)
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
          const newPgs = (userDoc.data as string[]).map((pg) => {
            return JSON.parse(pg)
          })
          insertPgToDatabase(newPgs, db)
          setPGIds(newPgs)
        }
      }
      setLoading(false)
    },
    [pgs]
  )

  const insertPgToDatabase = useCallback(
    (newPgs: PG[], db: Dexie | undefined) => {
      console.log('start insertPgToDatabase', newPgs, db)
      db?.table('pg')
        .bulkPut(newPgs)
        .then(() => {
          console.log('insertPgToDatabase ok')
        })
        .catch(Dexie.BulkError, (error) => {
          console.log('insertPgToDatabase error', error)
        })
    },
    []
  )

  const clearPgDatabase = useCallback(() => {
    dbInstance?.table('pg').clear()
  }, [])

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
        user={user}
        open={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={onLogin}
        onLogout={onLogout}
      />
    </div>
  )
}

export default withRouter(Dashboard)
