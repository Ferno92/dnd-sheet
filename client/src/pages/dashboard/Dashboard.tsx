import React, { useState, useEffect } from 'react';
import Dexie from 'dexie'
import PG from 'pages/stats/models/PG';
import { Add } from '@material-ui/icons'
import { MenuItem, Typography, Fab, Avatar } from '@material-ui/core';
import { withRouter, RouteComponentProps } from "react-router-dom";
import DashboardStyles from './Dashboard.styles';

interface DashboardProps {

}

function Dashboard(props: DashboardProps & RouteComponentProps) {
    // Declare a new state variable, which we'll call "count"
    const [pgs, setPGIds] = useState<PG[]>([]);
    const classes = DashboardStyles()
    console.log('DASHBOARD')

    useEffect(() => {
        //load only once
        const db = new Dexie('pg01_database')
        db.version(1).stores({
            pg: 'id,name,race,pgClass,level,stats'
        })
        db.open().then(() => {
            const pgTable = db.table('pg')
            let pgList: PG[] = []
            pgTable.each((pg: PG) => {
                pgList.push(pg)
            }).then(() => {
                console.log(pgList);
                setPGIds(pgList)
            })
        })
    }, [])

    const addPG = () => {
        props.history.push(`/sheet/${pgs.length + 1}`)
    }

    const getFirstLetters = (name: string): string => {
        var matches = name.match(/\b(\w)/g); // ['J','S','O','N']
        return matches ? matches.join('') : ''; // JSON
    }

    return (
        <div>
            <Typography variant='h5'>
                PG creati
        </Typography>
            {pgs.map((pg) => (
                <MenuItem key={pg.id} onClick={() => props.history.push(`/sheet/${pg.id}`)}>
                    <Avatar className={classes.avatar}>{getFirstLetters(pg.name)}</Avatar>{pg.name}
                </MenuItem>
            )
            )}

            <Fab color='primary' aria-label="Add" size="medium" onClick={addPG} className={classes.fab}>
                <Add />
            </Fab>
        </div>
    );
}

export default withRouter(Dashboard)