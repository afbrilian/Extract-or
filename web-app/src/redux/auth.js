import { createActions, handleActions } from 'redux-actions'
import { actionCreator } from './helpers'

export const {
  auth: {
    signInAnonymously,
    signInAnonymouslySuccess,
    signInAnonymouslyFailed,
    reset
  }
} = createActions({
  AUTH: {
    SIGN_IN_ANONYMOUSLY: actionCreator,
    SIGN_IN_ANONYMOUSLY_SUCCESS: actionCreator,
    SIGN_IN_ANONYMOUSLY_FAILED: actionCreator,
    RESET: actionCreator
  }
})

const initialState = {
  user: undefined,
  error: undefined
}

export default handleActions(
  {
    [signInAnonymously]: (state) => ({ ...state }),

    [signInAnonymouslySuccess]: (state, { payload: { user } }) => {
      return {
        ...state,
        error: undefined,
        user
      }
    },

    [signInAnonymouslyFailed]: (state, { payload: { error } }) => ({
      ...state,
      error,
      user: undefined
    }),

    [reset]: () => ({ ...initialState })
  },
  initialState
)
