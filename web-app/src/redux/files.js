import { createActions, handleActions } from 'redux-actions'
import { actionCreator } from './helpers'

export const {
  files: { upload, uploadSuccess, uploadFailed, parserFinished, reset }
} = createActions({
  FILES: {
    UPLOAD: actionCreator,
    UPLOAD_SUCCESS: actionCreator,
    UPLOAD_FAILED: actionCreator,
    PARSER_FINISHED: actionCreator,
    RESET: actionCreator
  }
})

const initialState = {
  files: [],
  inProgress: false,
  success: undefined,
  error: undefined,
  parseInProgress: false
}

export default handleActions(
  {
    [upload]: (state) => {
      return {
        ...state,
        inProgress: true
      }
    },

    [uploadSuccess]: (state) => ({
      ...state,
      inProgress: false,
      success: true,
      error: undefined,
      parseInProgress: true
    }),

    [uploadFailed]: (state, { payload: { error } }) => ({
      ...state,
      inProgress: false,
      success: false,
      error: error
    }),

    [parserFinished]: (state) => ({
      ...state,
      parseInProgress: false
    }),

    [reset]: () => ({ ...initialState })
  },
  initialState
)
