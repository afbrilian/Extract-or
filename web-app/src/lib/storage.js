import { firebaseStorage } from './provider/firebase'

const upload = async (user, files) => {
  const storageRef = firebaseStorage.ref()
  const path = `${user.uid}/pdf`
  const promises = []
  for (const file of files) {
    const userRef = storageRef.child(`${path}/${file.filename}`) 
    promises.push(userRef.put(file))
  }
  await promises
}

export { upload }
