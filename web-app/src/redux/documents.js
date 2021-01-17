import { createActions, handleActions } from 'redux-actions'
import { actionCreator } from './helpers'

export const {
  documents: { append, reset }
} = createActions({
  DOCUMENTS: {
    APPEND: actionCreator,
    RESET: actionCreator
  }
})

const initialState = {
  files: []
}

export default handleActions(
  {
    [append]: (state, { payload: { fileName, pages } }) => {
      const existingFiles = [...state.files]

      if (existingFiles.findIndex((file) => file.fileName === fileName) >= 0) {
        return { ...state }
      }
      existingFiles.push({ fileName, pages })

      return {
        ...state,
        files: existingFiles
      }
    },

    [reset]: () => ({ ...initialState })
  },
  initialState
)
