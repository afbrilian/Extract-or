import { firebaseStorage } from './provider/firebase'

const upload = async (user, files) => {
  const storageRef = firebaseStorage.ref()
  const promises = []
  for (const file of files) {
    promises.push(uploadImageAsPromise(user, storageRef, file))
  }
  await promises
}

const uploadImageAsPromise = (user, storageRef, file) => {
  return new Promise((resolve, reject) => {
    const userRef = storageRef.child(`${user.uid}/pdf/${file.filename}`)
    const task = userRef.put(file)

    task.on(
      'state_changed',
      function progress() {},
      function error(err) {
        reject(err)
      },
      function complete() {
        resolve()
      }
    )
  })
}

export { upload }
