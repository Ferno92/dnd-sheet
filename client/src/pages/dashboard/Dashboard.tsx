import React, { useState, useEffect, useCallback } from 'react'
import Dexie from 'dexie'
import PG from 'pages/stats/models/PG'
import { Add, Delete } from '@material-ui/icons'
import {
  Typography,
  Fab,
  Avatar,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import DashboardStyles from './Dashboard.styles'
import ConfirmDialog from 'components/confirm-dialog/ConfirmDialog'
import Skeleton from '@material-ui/lab/Skeleton'

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

  return (
    <div className={classes.list}>
      <Typography variant="h5" className={classes.title}>
        I tuoi personaggi
      </Typography>
      {loading ? (
        [...Array(3).keys()].map(i => {
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
      ) : (
        <React.Fragment>
          {pgs.map((pg: PG, i: number) => (
            <ListItem
              key={pg.id}
              dense
              button
              onClick={() => props.history.push(`/sheet/${pg.id}/${0}`)}
            >
              <ListItemIcon>
                <Avatar className={classes.avatar} src={pg.image}>
                  {pg.image ? '' : getFirstLetters(pg.name)}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={pg.name}
                secondary={`${pg.race} ${pg.pgClass} Lv.${pg.level}`}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => setPgToDelete(i)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {pgs.length === 0 && (
            <Typography variant="body1" className={classes.emptyDescription}>
              Non hai ancora dei personaggi, creane subito uno
            </Typography>
          )}

          <Fab
            color="primary"
            aria-label="Add"
            size="medium"
            onClick={addPG}
            className={classes.fab}
          >
            <Add />
          </Fab>
        </React.Fragment>
      )}

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
