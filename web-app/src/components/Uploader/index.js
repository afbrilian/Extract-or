import React, { memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CircularProgress from '@material-ui/core/CircularProgress'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'

import { upload } from '../../redux/files'

import styles from './styles'
import 'filepond/dist/filepond.min.css'

registerPlugin(FilePondPluginFileValidateType)

const useStyles = makeStyles(styles)

export default memo(({ showAlert }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { isUploadInProgress } = useSelector((state) => ({
    isUploadInProgress: state.files.inProgress,
    isUploadSuccess: state.files.success
  }))

  const [files, setFiles] = useState([])
  const [isSubmitEnabled, setSubmitEnabled] = useState(false)

  const onUploadFiles = (fileItems) => {
    if (fileItems.length > 0) {
      setFiles(fileItems)
      setSubmitEnabled(true)
    } else {
      setFiles(fileItems)
      setSubmitEnabled(false)
    }
  }

  const onSubmit = () => {
    if (files.length === 0) {
      showAlert('warning', 'Please upload some files first!')
      return
    }
    dispatch(upload({ files: files.map((fileItem) => fileItem.file) }))
    setFiles([])
  }

  return (
    <>
      <FilePond
        files={files}
        allowMultiple={true}
        onupdatefiles={onUploadFiles}
        allowReorder={false}
        acceptedFileTypes={['application/pdf']}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <Button
        fullWidth
        size="large"
        variant="contained"
        color="primary"
        onClick={onSubmit}
        className={classes.button}
        disabled={!isSubmitEnabled || isUploadInProgress}
        startIcon={!isUploadInProgress && <CloudUploadIcon />}
      >
        {isUploadInProgress ? (
          <CircularProgress color="primary" size={24} />
        ) : (
          ' Upload'
        )}
      </Button>
    </>
  )
})
