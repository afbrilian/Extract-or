import { createActions, handleActions } from 'redux-actions'
import { actionCreator } from './helpers'

export const {
  auth: { signInAnonymouslySuccess, reset }
} = createActions({
  AUTH: {
    SIGN_IN_ANONYMOUSLY_SUCCESS: actionCreator,
    RESET: actionCreator
  }
})

const initialState = {
  user: undefined,
  error: undefined
}

export default handleActions(
  {
    [signInAnonymouslySuccess]: (state, { payload: { user } }) => {
      return {
        ...state,
        error: undefined,
        user
      }
    },

    [reset]: () => ({ ...initialState })
  },
  initialState
)
