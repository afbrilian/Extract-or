import auth from './auth'
import files from './files'

const sagas = [...auth, ...files]

export default sagas
