import React, { useState, useEffect } from 'react';
import Dexie from 'dexie'
import PG from 'pages/stats/models/PG';
import { MenuItem, Typography } from '@material-ui/core';
import { withRouter, RouteComponentProps } from "react-router-dom";

interface DashboardProps {

}

function Dashboard(props: DashboardProps & RouteComponentProps) {
    // Declare a new state variable, which we'll call "count"
    const [pgs, setPGIds] = useState<PG[]>([]);
    console.log('DASHBOARD')

    useEffect(()=>{
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
            }).then(()=>{
                console.log(pgList);
                setPGIds(pgList)
            })
        })
    }, [])  

    return (
        <div>
            <Typography variant='h5'>
                PG creati
        </Typography>
            {pgs.map((pg) => (
                <MenuItem key={pg.id} onClick={() => props.history.push(`/sheet/${pg.id}`)}>
                    {pg.name}
                </MenuItem>
            )
            )}
            
          {/* <Fab color='primary' aria-label="Add" size="medium" onClick={this.onChangeEditMode} className={classes.fab}>
            { onEdit ? <Done/> : <Edit />}
          </Fab> */}
        </div>
    );
}

export default withRouter(Dashboard)