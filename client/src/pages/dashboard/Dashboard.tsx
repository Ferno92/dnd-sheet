import React, { useState, useEffect, useCallback } from 'react'
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
  Tooltip
} from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import DashboardStyles from './Dashboard.styles'
import ConfirmDialog from 'components/confirm-dialog/ConfirmDialog'
import Skeleton from '@material-ui/lab/Skeleton'
import StatsUtils from 'utils/StatsUtils'
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login'

interface DashboardProps {}

function Dashboard(props: DashboardProps & RouteComponentProps) {
  // Declare a new state variable, which we'll call "count"
  const [pgs, setPGIds] = useState<PG[]>([])
  const [pgToDelete, setPgToDelete] = useState<number>()
  const [dbInstance, setDbInstance] = useState<Dexie>()
  const [loading, setLoading] = useState<boolean>(true)
  const classes = DashboardStyles()

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

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response)
  }

  return (
    <div className={classes.root}>
      <div className={classes.login}>
        <Typography variant="h5">CIAO</Typography>
        <Typography variant="body1">
          Non hai ancora effettuato il login. Se vuoi usare i tuoi personaggi su
          più dispositivi, ti consigliamo di farlo. E' semplice e veloce!
        </Typography>
        <GoogleLogin
          clientId="301028242623-nbso2movb7a8iuc4vd1oscanfnfh8m4g.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <Typography variant="h5" className={classes.title}>
        I tuoi personaggi
      </Typography>

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
    </div>
  )
}

export default withRouter(Dashboard)
