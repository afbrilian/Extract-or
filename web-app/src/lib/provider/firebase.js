import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY
const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
const projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID
const storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.REACT_APP_FIREBASE_APP_ID

const options = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
}

const firebaseApp = firebase.initializeApp(options)

export const firebaseAuth = firebaseApp.auth()
export const firebaseStorage = firebaseApp.storage()
