import React, { useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'
import { RouteComponentProps } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseConfig } from 'App'
import Dexie from 'dexie'
import PG from 'pages/stats/models/PG'

interface DownloadPGProps {
  id: string
}

const DownloadPG: React.FC<DownloadPGProps &
  RouteComponentProps<{ id: string }>> = (
  props: DownloadPGProps & RouteComponentProps<{ id: string }>
) => {
  const { id } = props.match.params
  console.log('pg to download: ', id)

  useEffect(() => {
    let didCancel = false

    const getFirestoreData = async () => {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
      }
      const response = await firebase
        .app()
        .firestore()
        .collection('sharing')
        .doc(id)
        .get()
      if (!didCancel) {
        const data = response.data() as any
        const pgData = JSON.parse(data.data)
        let pgTable: Dexie.Table<PG, number> | undefined
        const db = new Dexie('pg01_database')
        db.version(1).stores({
          pg: 'id,name,race,pgClass,level,stats'
        })
        db.open().then(async () => {
          pgTable = db.table('pg')
          let count = 0
          await Promise.all([
            pgTable.each((pg: PG) => {
              count = pg.id > count ? pg.id : count
            })
          ])
          pgTable
            .put({ ...pgData, id: count + 1 })
            .then(() => {
              props.history.replace(`/`)
            })
            .catch(err => console.log('err: ', err))
        })
      }
    }

    getFirestoreData()

    return () => {
      didCancel = true
    }
  }, [id, props.history])
  return (
    <div>
      <CircularProgress size={48} />
    </div>
  )
}

export default DownloadPG
