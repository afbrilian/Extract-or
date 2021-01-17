import React, { memo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import makeStyles from '@material-ui/core/styles/makeStyles'

import { append } from '../../redux/documents'
import { parserFinished } from '../../redux/files'
import * as db from '../../lib/database'
import styles from './styles'

const useStyles = makeStyles(styles)

export default memo(() => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { uid, documents, isParseInProgress } = useSelector((state) => ({
    uid: state.auth?.user?.uid,
    documents: state.documents?.files,
    isParseInProgress: state.files?.parseInProgress
  }))

  const unSubscribedataListener = useRef(null)
  useEffect(() => {
    if (uid) {
      unSubscribedataListener.current = db.subscribeToDataChanges(
        uid,
        dataChangesHandler
      )
    }
    return () => {
      if (unSubscribedataListener && unSubscribedataListener.current) {
        unSubscribedataListener.current()
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const dataChangesHandler = (snapshot) => {
    for (let i = snapshot.docs.length; i--; ) {
      const doc = snapshot.docs[i]
      dispatch(append({ fileName: doc.id, ...doc.data() }))
      dispatch(parserFinished())
    }
  }
  return (
    <>
      {documents.map((document, i) => (
        <Accordion key={i}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              {document.fileName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.content}>
            <Typography>{document.pages}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      {isParseInProgress && (
        <Box>
          <LinearProgress className={classes.parserLoader} />
          <Typography align="center">Processing your PDF....</Typography>
        </Box>
      )}
    </>
  )
})
