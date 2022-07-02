import { utilService } from "./util-service.js"
import { storageService } from "./async-storage-service.js"

const MAILS_KEY = "emails"
_createEmails()

export const emailService = {
  query,
  remove,
  save,
  getEmptyEmail,
  get,
  getNextEmailId,
  addEmail,
  getLoggedinUser,
}

function addEmail(email) {
  return storageService.post(MAILS_KEY, email)
}

function query() {
  return storageService.query(MAILS_KEY)
}

function remove(emailId) {
  return storageService.remove(MAILS_KEY, emailId)
}

function get(emailId) {
  return storageService.get(MAILS_KEY, emailId)
}

function save(email) {
  if (email.id) return storageService.put(MAILS_KEY, email)
  else return storageService.post(MAILS_KEY, email)
}

function getNextEmailId(emailId) {
  return storageService.query(MAILS_KEY).then((emails) => {
    const idx = emails.findIndex((email) => email.id === emailId)
    return idx < emails.length - 1 ? emails[idx + 1].id : emails[0].id
  })
}

function getEmptyEmail() {
  return { id: "", name: "", to: "", subject: "", body: "" }
}
function getLoggedinUser() {
  return {
    email: "user@appsus.com",
    fullname: "akuna matata",
  }
}

function _createEmails() {
  let emails = utilService.loadFromStorage(MAILS_KEY)
  if (!emails || !emails.length) {
    emails = [
      {
        id: "e101",
        subject: "Hello!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: 1551133930594,
        to: "dor@momo.com",
        name: "Dor",
        state: 'all',
      },
      {
        id: "e102",
        subject: "Welcome!",
        body: "Would love to catch up sometimes, Would love to catch up sometimes",
        isRead: false,
        sentAt: 1551133930594,
        to: "daniel@momo.com",
        name: "Daniel",
        state: 'all',

      },
      {
        id: "e103",
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        sentAt: 1551133930594,
        to: "momo@momo.com",
        name: "Momo",
        state: 'all',

      },
    ]
    utilService.saveToStorage(MAILS_KEY, emails)
  }
  return emails
}
