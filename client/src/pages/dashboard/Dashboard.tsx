import React, { useState, useEffect } from 'react'
import Dexie from 'dexie'
import PG from 'pages/stats/models/PG'
import { Add } from '@material-ui/icons'
import { MenuItem, Typography, Fab, Avatar } from '@material-ui/core'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import DashboardStyles from './Dashboard.styles'

interface DashboardProps {}

function Dashboard(props: DashboardProps & RouteComponentProps) {
  // Declare a new state variable, which we'll call "count"
  const [pgs, setPGIds] = useState<PG[]>([])
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
        })
    })
  }, [])

  const addPG = () => {
    props.history.push(`/sheet/${pgs.length + 1}/0`)
  }

  const getFirstLetters = (name: string): string => {
    var matches = name.match(/\b(\w)/g) // ['J','S','O','N']
    return matches ? matches.join('') : '' // JSON
  }

  return (
    <div>
      <Typography variant="h5" className={classes.title}>
        PG creati
      </Typography>
      {pgs.map(pg => (
        <MenuItem
          key={pg.id}
          onClick={() => props.history.push(`/sheet/${pg.id}/${0}`)}
        >
          <Avatar className={classes.avatar} src={pg.image}>
            {pg.image ? '' : getFirstLetters(pg.name)}
          </Avatar>
          <div>
            <Typography variant="body1">{pg.name}</Typography>
            <Typography variant="caption">{`${pg.race} ${pg.pgClass} LV.${pg.level}`}</Typography>
          </div>
        </MenuItem>
      ))}

      <Fab
        color="primary"
        aria-label="Add"
        size="medium"
        onClick={addPG}
        className={classes.fab}
      >
        <Add />
      </Fab>
    </div>
  )
}

export default withRouter(Dashboard)
