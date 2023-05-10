import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    query,
    get,
    remove,
}

const EMAILS_STORAGE_KEY = 'emailsDB'

const demoEmails = [
    {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
    },
    {
        id: utilService.makeId(),
        subject: 'Blah Blah Blah',
        body: 'Would love to catch up sometimes',
        isRead: true,
        sentAt: 1551132930594,
        removedAt: null,
        from: 'muki@muki.com',
        to: 'user@appsus.com',
    },
    {
        id: utilService.makeId(),
        subject: 'some mail',
        body: 'Would love to catch up sometimes flsdlifsdlif sdfsdfsdf sdfsdfsdf sdfsdfs dfsdfsdf sdfsdf',
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        from: 'muki@muki.com',
        to: 'user@appsus.com',
    },
]

// const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

_createEmails()

function query() {
    return asyncStorageService.query(EMAILS_STORAGE_KEY).then((mails) => {
        return mails
    })
}

function get(id) {
    return asyncStorageService.get(EMAILS_STORAGE_KEY, id).then((mail) => {
        return mail
    })
}

function remove(id) {
    return asyncStorageService.remove(EMAILS_STORAGE_KEY, id)
}

// private functions:

function _createEmails() {
    let emails = storageService.loadFromStorage(EMAILS_STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = demoEmails
        storageService.saveToStorage(EMAILS_STORAGE_KEY, emails)
    }
}

// function _createEmail(title, description, thumbnail, listPrice) {
//     const book = getEmptyBook()
//     book.id = utilService.makeId()
//     book.title = title
//     book.description = description
//     book.thumbnail = thumbnail
//     book.listPrice = listPrice
//     return book
//   }
