import { createActions, handleActions } from 'redux-actions'
import { actionCreator } from './helpers'

export const {
  files: { upload, uploadSuccess, uploadFailed, reset }
} = createActions({
  FILES: {
    UPLOAD: actionCreator,
    UPLOAD_SUCCESS: actionCreator,
    UPLOAD_FAILED: actionCreator,
    RESET: actionCreator
  }
})

const initialState = {
  files: [],
  inProgress: false,
  success: undefined,
  error: undefined
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
      error: undefined
    }),

    [uploadFailed]: (state, { payload: { error } }) => ({
      ...state,
      inProgress: false,
      success: false,
      error: error
    }),

    [reset]: () => ({ ...initialState })
  },
  initialState
)
