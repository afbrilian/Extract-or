import { db } from './provider/firebase'

const subscribeToDataChanges = async (uid, handler) =>
  db.collection(uid).onSnapshot(handler)

const getDocuments = async (uid) => db.collection(uid).get()

export { subscribeToDataChanges, getDocuments }
