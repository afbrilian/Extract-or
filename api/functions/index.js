const functions = require('firebase-functions')
const admin = require('firebase-admin')
const pdfjs = require('pdfjs-dist/es5/build/pdf')
const path = require('path')
const os = require('os')
const fs = require('fs')

admin.initializeApp()

exports.extractText = functions.storage.object().onFinalize(async (object) => {
  const contentType = object.contentType
  if (contentType !== 'application/pdf') {
    return console.log('This is not a PDF file.')
  }

  let tempFilePath
  try {
    const fileBucket = object.bucket
    const filePath = object.name
    const fileName = path.basename(filePath)
    const uid = filePath.split('/')[0]

    const bucket = admin.storage().bucket(fileBucket)
    tempFilePath = path.join(os.tmpdir(), fileName)
    await bucket.file(filePath).download({ destination: tempFilePath })
    const pdf = await pdfjs.getDocument(tempFilePath).promise

    const pages = []
    for (let i = 1; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      const texts = content.items.reduce((acc, item) => acc + item.str, '')
      pages.push(texts)
    }
    await admin
      .firestore()
      .collection(uid)
      .doc(fileName)
      .set({ pages }, { merge: true })

    console.log({ success: true })
  } catch (error) {
    console.log({ success: false, error })
  }
  fs.unlinkSync(tempFilePath)
})
