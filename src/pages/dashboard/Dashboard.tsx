import React, { useState, useEffect, useCallback, useContext } from 'react'
import Dexie from 'dexie'
import PG from 'pages/stats/models/PG'
import { Add, Delete } from '@mui/icons-material'
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
} from '@mui/material'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import DashboardStyles from './Dashboard.styles'
import ConfirmDialog from 'components/confirm-dialog/ConfirmDialog'
import Skeleton from '@mui/material/Skeleton'
import StatsUtils from 'utils/StatsUtils'
import LoginDialog from 'components/login-dialog/LoginDialog'
import BrightnessIcon from '@mui/icons-material/Brightness6'
import { ThemeContext } from 'index'
import { useGoogleOneTapLogin } from 'react-google-one-tap-login'
import { firebaseApp } from 'App'
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import BackupDialog from 'components/backup-dialog/BackupDialog'

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

const DexiePgTable = 'pg'
export const DexieUserTable = 'user'
export const UsersDocName =
  window.location.hostname.includes('schedadnd-test') ||
  window.location.hostname.includes('dnd-sheet-test') ||
  window.location.hostname.includes('localhost')
    ? 'users-dev'
    : 'users'

function Dashboard(props: DashboardProps & RouteComponentProps) {
  // Declare a new state variable, which we'll call "count"
  const [pgs, setPGIds] = useState<PG[]>([])
  const [pgToDelete, setPgToDelete] = useState<PG>()
  const [dbInstance, setDbInstance] = useState<Dexie>()
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<GoogleUser>()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showBackupDialog, setShowBackupDialog] = useState(false)
  const [oneTapLoginDisabled, setOneTapLoginDisabled] = useState(true)
  const classes = DashboardStyles()
  const { mode, setMode } = useContext(ThemeContext)
  const firebaseDb = getFirestore(firebaseApp)

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

  useEffect(() => {
    if (user != undefined) {
      checkUserPgDatabase(user, true, dbInstance)
    }
  }, [user])

  const fetchUserDatabase = useCallback(
    (db: Dexie) => {
      db.open().then(() => {
        const userTable = db.table(DexieUserTable)
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
      const pgTable = db.table(DexiePgTable)
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

  const randomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }

  const addPG = useCallback(() => {
    props.history.push(`/sheet/${randomInt(10000)}/0`, { isNew: true })
  }, [pgs])

  const getFirstLetters = (name: string): string => {
    var matches = name.match(/\b(\w)/g) // ['J','S','O','N']
    return matches ? matches.join('') : '' // JSON
  }

  const onDeleteItem = useCallback(() => {
    if (dbInstance && pgToDelete !== undefined) {
      dbInstance.table(DexiePgTable).delete(pgToDelete.id)
      const temp = [...pgs]
      const pgIndex = pgs.findIndex((pg) => pg.id == pgToDelete.id)
      temp.splice(pgIndex, 1)
      setPGIds(temp)
      setPgToDelete(undefined)
      deletePgInFirestore([...temp, { ...pgToDelete, deleted: true }])
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
    dbInstance?.table(DexieUserTable).delete(user?.id)
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
    },
    googleAccountConfigs: {
      client_id:
        '301028242623-nbso2movb7a8iuc4vd1oscanfnfh8m4g.apps.googleusercontent.com',
    },
    disabled: oneTapLoginDisabled || user != undefined || showLoginDialog,
  })

  const checkUserPgDatabase = useCallback(
    async (user: GoogleUser, loggingIn: boolean, db: Dexie | undefined) => {
      if (user.id) {
        if (loggingIn) {
          //save user in db
          db?.table(DexieUserTable).put(user)
        }
        const response = await getDocs(collection(firebaseDb, UsersDocName))
        const userDoc = response.docs.find((doc) => doc.id == user?.id)?.data()
        if (userDoc == undefined) {
          savePgToFirestore(user, pgs)
        } else {
          //check/download pgs
          const remotePgs = userDoc.data as PG[]
          const remotePgIds = new Set(remotePgs.map((u) => u.id))
          const newPgs = [
            ...remotePgs,
            ...pgs.filter((u) => !remotePgIds.has(u.id)),
          ]
          savePgToFirestore(user, newPgs)
          const currentPgs = newPgs.filter((pg) => pg.deleted != true)
          insertPgToDatabase(currentPgs, db)
          setPGIds(currentPgs)
        }
      }
      setLoading(false)
    },
    [pgs]
  )

  const savePgToFirestore = useCallback((user: GoogleUser, pgsToSave: PG[]) => {
    if (user.id) {
      const ref = doc(firebaseDb, UsersDocName, user.id)
      setDoc(ref, {
        data: pgsToSave,
      })
        .then(() => {
          //console.log('saved user pgs', user?.id)
        })
        .catch((error) => {
          console.log('db upload err: ', error)
        })
    }
  }, [])

  const insertPgToDatabase = useCallback(
    (newPgs: PG[], db: Dexie | undefined) => {
      db?.table(DexiePgTable)
        .bulkPut(newPgs)
        .then(() => {
          //console.log('insertPgToDatabase ok')
        })
        .catch(Dexie.BulkError, (error) => {
          console.log('insertPgToDatabase error', error)
        })
    },
    []
  )

  const clearPgDatabase = useCallback(() => {
    dbInstance?.table(DexiePgTable).clear()
  }, [dbInstance])

  const deletePgInFirestore = useCallback(
    (pgs: PG[]) => {
      if (user?.id) {
        const ref = doc(firebaseDb, UsersDocName, user?.id)
        updateDoc(ref, {
          data: pgs,
        })
          .then(() => {
            //console.log('updateDoc ok')
          })
          .catch((error) => {
            console.log('updateDoc err: ', error)
          })
      }
    },
    [user]
  )

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.loginButtonContainer}>
          <IconButton onClick={toggleDarkMode} size="large">
            <BrightnessIcon />
          </IconButton>
        </div>
        <Typography variant="h5" className={classes.title}>
          I tuoi personaggi
        </Typography>
        <div className={classes.rightAction}>
          <IconButton onClick={() => setShowLoginDialog(true)} size="large">
            <Avatar alt="User" src={user?.picture} />
          </IconButton>
        </div>
      </div>

      <div className={classes.list}>
        {loading
          ? [...Array(3).keys()].map((i) => {
              return (
                <div className={classes.skeletonContainer} key={i}>
                  <Skeleton variant="circular" height={50} width={50} />
                  <div className={classes.skeletonInfo}>
                    <Skeleton
                      variant="rectangular"
                      height={24}
                      width={200}
                      className={classes.skeleton}
                    />
                    <Skeleton variant="rectangular" height={16} width={160} />
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
                    <IconButton onClick={() => setPgToDelete(pg)} size="large">
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
          <Typography variant="body1" className={classes.emptyDescriptionText}>
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
        onClose={(showBackup: boolean) => {
          setShowLoginDialog(false)
          setShowBackupDialog(showBackup)
        }}
        onLogin={onLogin}
        onLogout={onLogout}
      />

      <BackupDialog
        user={user}
        open={showBackupDialog}
        onClose={() => setShowBackupDialog(false)}
        firebaseDb={firebaseDb}
        history={props.history}
        location={props.location}
        match={props.match}
      />
    </div>
  )
}

export default withRouter(Dashboard)
