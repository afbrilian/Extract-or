import { firebaseAuth } from './provider/firebase'

const signInAnonymously = async () => {
  await firebaseAuth.signInAnonymously()

  return new Promise((resolve, reject) => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user)
      } else {
        reject('Failed to create user session!')
      }
    })
  })
}

export { signInAnonymously }
