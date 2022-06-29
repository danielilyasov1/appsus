import { utilService } from "./util-service.js"
import { storageService } from "./async-storage-service.js"

const MAILS_KEY = "mails"
_createMails()

export const mailService = {
  query,
  remove,
  save,
  getEmptyMail,
  get,
  getNextMailId,
  addMail,
  getLoggedinUser,
}

function addMail(mail) {
  return storageService.post(MAILS_KEY, mail)
}

function query() {
  return storageService.query(MAILS_KEY)
}

function remove(mailId) {
  return storageService.remove(MAILS_KEY, mailId)
}

function get(mailId) {
  return storageService.get(MAILS_KEY, mailId)
}

function save(mail) {
  if (mail.id) return storageService.put(MAILS_KEY, mail)
  else return storageService.post(MAILS_KEY, mail)
}

function getNextMailId(MailId) {
  return storageService.query(MAILS_KEY).then((Mails) => {
    const idx = Mails.findIndex((Mail) => Mail.id === MailId)
    return idx < Mails.length - 1 ? Mails[idx + 1].id : Mails[0].id
  })
}

function getEmptyMail() {
  return { id: "", name: "", to: "", subject: "", body: "" }
}
function getLoggedinUser() {
  const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'akuna matata'
   }
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAILS_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: "e101",
        subject: "hello!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: 1551133930594,
        to: "dor@momo.com",
        name: "dor",
      },
      {
        id: "e102",
        subject: "welcome!",
        body: "Would love to catch up sometimes, Would love to catch up sometimes",
        isRead: false,
        sentAt: 1551133930594,
        to: "daniel@momo.com",
        name: "daniel",
      },
      {
        id: "e103",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: 1551133930594,
        to: "momo@momo.com",
        name: "momo",
      },
    ]
    utilService.saveToStorage(MAILS_KEY, mails)
  }
  return mails
}
