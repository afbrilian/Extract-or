import { takeLatest, call, put } from 'redux-saga/effects'

import {
  signInAnonymously,
  signInAnonymouslySuccess,
  signInAnonymouslyFailed
} from '../redux/auth'
import * as auth from '../lib/authentication'

export function* signInAnonymouslySaga() {
  try {
    const user = yield call(auth.signInAnonymously)
    yield put(signInAnonymouslySuccess({ user }))
  } catch (error) {
    console.log(error)
    yield put(signInAnonymouslyFailed({ error: error.message }))
  }
}
export function* watchSignInAnonymouslyAction() {
  yield takeLatest(signInAnonymously.toString(), signInAnonymouslySaga)
}

const sagas = [watchSignInAnonymouslyAction]

export default sagas
