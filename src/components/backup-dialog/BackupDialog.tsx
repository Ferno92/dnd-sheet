import React, { useCallback, useEffect, useState } from 'react'
import {
  AppBar,
  CircularProgress,
  Dialog,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { GoogleUser, UsersDocName } from 'pages/dashboard/Dashboard'
import { ExpandMore, Close } from '@mui/icons-material'
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
import { RouteComponentProps } from 'react-router-dom'

interface BackupDialogProps {
  user?: GoogleUser
  open: boolean
  firebaseDb: Firestore
  onClose: () => void
}

const BackupDialog: React.FC<BackupDialogProps & RouteComponentProps> = (
  props: BackupDialogProps & RouteComponentProps
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
          copy.set(id, backupPgs || [])
          setBackup(copy)
        })
      }
    },
    [backup, user]
  )

  const goToPreview = useCallback((id: string, date: string) => {
    const backupDate = btoa(encodeURIComponent(date))
    props.history.push(`/sheet/${id}/${0}/${backupDate}`)
  }, [])

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
            size="large">
            <Close />
          </IconButton>
          <Typography variant="h6" component="div">
            Backup Personaggi
          </Typography>
        </Toolbar>
      </AppBar>
      {remotePgs.map((pg) => (
        <Accordion
          key={pg.id}
          onChange={(event, expanded) => {
            if (expanded) {
              fetchPgBackups(pg.id.toString())
            }
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="body1">
              {`${pg.name} (${pg.pgClass} LV. ${StatsUtils.getLevelPgFromPE(
                pg.pe
              )})`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.panelDetails}>
            <List className={styles.list}>
              {backup.get(pg.id.toString())?.length == 0 ? (
                <Typography variant="body1">
                  Non ci sono ancora backup di questo personaggio
                </Typography>
              ) : (
                backup.get(pg.id.toString())?.map((b) => (
                  <ListItem
                    key={b.date}
                    button
                    onClick={() => goToPreview(pg.id.toString(), b.date)}
                  >
                    <ListItemText
                      primary={`${b.pg.pgClass} LV.${StatsUtils.getPgLevel(
                        b.pg.pe
                      )} (${b.pg.pe} PE)`}
                      secondary={`${new Date(
                        b.date
                      ).toLocaleDateString()} ${new Date(
                        b.date
                      ).toLocaleTimeString()}`}
                    />
                  </ListItem>
                )) || <CircularProgress />
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Dialog>
  );
}

export default BackupDialog
