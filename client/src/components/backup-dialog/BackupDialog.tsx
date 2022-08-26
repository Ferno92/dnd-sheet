import React, { useCallback, useEffect, useState } from 'react'
import {
  AppBar,
  CircularProgress,
  Dialog,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { GoogleUser, UsersDocName } from 'pages/dashboard/Dashboard'
import { ExpandMore, Close } from '@material-ui/icons'
import {
  Firestore,
  getDocs,
  collection,
  doc,
  query,
  onSnapshot,
} from 'firebase/firestore'
import PG from 'pages/stats/models/PG'
import useStyles from './BackupDialog.styles'
import StatsUtils from 'utils/StatsUtils'
import BackupPG from 'pages/stats/models/BackupPG'

interface BackupDialogProps {
  user?: GoogleUser
  open: boolean
  firebaseDb: Firestore
  onClose: () => void
}

const BackupDialog: React.FC<BackupDialogProps> = (
  props: BackupDialogProps
) => {
  const { open, user, onClose, firebaseDb } = props
  const [remotePgs, setRemotePgs] = useState<PG[]>([])
  const [backup, setBackup] = useState<Map<string, BackupPG[]>>(new Map())
  const styles = useStyles()

  const fetchPgs = useCallback(
    async (user: GoogleUser) => {
      const response = await getDocs(collection(firebaseDb, UsersDocName))
      const firestorePgs =
        (response.docs.find((doc) => doc.id == user.id)?.data().data as PG[]) ||
        []
      setRemotePgs(firestorePgs)
    },
    [firebaseDb]
  )

  const fetchPgBackups = useCallback(
    (id: string) => {
      if (backup?.get(id) == undefined) {
        const backupPath = `${UsersDocName}/${user?.id}/backup`
        getDocs(collection(firebaseDb, backupPath)).then((response) => {
          const backupPgs = response.docs.find((doc) => doc.id == id)?.data()
            .data as BackupPG[]
          const copy = new Map(backup)
          copy.set(id, backupPgs)
          setBackup(copy)
        })
      }
    },
    [backup, user]
  )

  useEffect(() => {
    if (user && open) {
      fetchPgs(user)
    }
  }, [user, open])

  return (
    <Dialog fullScreen open={open}>
      <AppBar color="secondary" className={styles.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setBackup(new Map())
              onClose()
            }}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography variant="h6" component="div">
            Backup Personaggi
          </Typography>
        </Toolbar>
      </AppBar>
      {remotePgs.map((pg) => (
        <ExpansionPanel
          key={pg.id}
          onChange={(event, expanded) => {
            if (expanded) {
              fetchPgBackups(pg.id.toString())
            }
          }}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography variant="body1">
              {`${pg.name} (${pg.pgClass} LV. ${StatsUtils.getLevelPgFromPE(
                pg.pe
              )})`}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={styles.list}>
              {backup.get(pg.id.toString())?.map((b) => (
                <ListItem key={b.date} button>
                  <ListItemText
                    primary={`${new Date(
                      b.date
                    ).toLocaleDateString()} ${new Date(
                      b.date
                    ).toLocaleTimeString()}`}
                  />
                </ListItem>
              )) || <CircularProgress />}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Dialog>
  )
}

export default BackupDialog
