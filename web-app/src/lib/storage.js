import { firebaseStorage } from './provider/firebase'

const upload = async (user, files) => {
  const storageRef = firebaseStorage.ref()
  const path = `${user.uid}/pdf`
  for (const file of files) {
    const userRef = storageRef.child(`${path}/${file.name}`)
    await userRef.put(file)
  }
}

export { upload }
