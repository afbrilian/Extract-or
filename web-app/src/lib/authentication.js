import { firebaseAuth } from './provider/firebase'

const signInAnonymously = (handler, errorHandler) => {
  firebaseAuth.signInAnonymously().catch(errorHandler)
  firebaseAuth.onAuthStateChanged(handler)
}

export { signInAnonymously }
