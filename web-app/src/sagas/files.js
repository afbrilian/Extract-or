import { takeLatest, call, put, select } from 'redux-saga/effects'

import { upload, uploadSuccess, uploadFailed } from '../redux/files'
import * as storage from '../lib/storage'

export function* uploadFilesSaga({ payload }) {
  try {
    const user = yield select((state) => state.auth.user)
    yield call(storage.upload, user, payload.files)
    yield put(uploadSuccess())
  } catch (error) {
    yield put(uploadFailed({ error: error.message }))
  }
}
export function* watchUploadAction() {
  yield takeLatest(upload.toString(), uploadFilesSaga)
}

const sagas = [watchUploadAction]

export default sagas
