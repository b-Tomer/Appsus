import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    query,
    get,
    remove,
    send,
    setUnread,
    setRead,
    getDefaultFilter,
    getDefaultSort,
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
        shortFrom: _shortFrom('momo@momo.com'),
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
        shortFrom: _shortFrom('muki@muki.com'),
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
        shortFrom: _shortFrom('muki@muki.com'),
        to: 'user@appsus.com',
    },
    {
        id: utilService.makeId(),
        subject: 'How do I embed a big file (>1 GB) in a C++ program?',
        body: 'Some people say: "Write DRY code". However, that is the last thing I care about. Even after 1 year in programming my main concern is the functionality. I have seen even senior developers not caring about aesthetics. Is this normal?',
        isRead: false,
        sentAt: 1551032930594,
        removedAt: null,
        from: 'buki@muki.com',
        shortFrom: _shortFrom('buki@muki.com'),
        to: 'user@appsus.com',
    },
    {
        id: utilService.makeId(),
        subject: 'Is C++ the best programming language to learn first?',
        body: 'Is C++ the best language to start programming No No no no. My god, no  C++ is great … and terrible. Its big and complicated and gnarly. Start with a simpler language, for your own sanity. When you run into the limits of what you can do with another language, C++ will be there waiting for you and youll have learnt enough to know why the complexities of C++ are (sometimes) worth it. But dont start there.',
        isRead: false,
        sentAt: 1521032930594,
        removedAt: null,
        from: 'shuki@muki.com',
        shortFrom: _shortFrom('shuki@muki.com'),
        to: 'user@appsus.com',
    },
]

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

_createEmails()

function query(filterBy = {}, sortBy = {}) {
    return asyncStorageService.query(EMAILS_STORAGE_KEY).then((mails) => {
        // if (filterBy.readFilter === 'All mails' || filterBy.readFilter === '') {
        //     return mails
        // }
        if (filterBy.searchFilter) {
            const regExp = new RegExp(filterBy.searchFilter, 'i')
            mails = mails.filter((mail) => regExp.test(mail.subject))
        }
        if (filterBy.readFilter === 'Read') {
            mails = mails.filter((mail) => mail.isRead)
        }
        if (filterBy.readFilter === 'Unread') {
            mails = mails.filter((mail) => !mail.isRead)
        }
        if (filterBy.sentMails === true) {
            mails = mails.filter((mail) => mail.from === loggedinUser.email)
        }
        if (sortBy.sortByDate) mails = _sortMails(mails, 'sortByDate')
        else mails = _sortMails(mails, 'sortBySubject')
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

function send(mailData) {
    const newMail = _createEmail(mailData)
    return asyncStorageService.post(EMAILS_STORAGE_KEY, newMail)
}

function setUnread(id) {
    asyncStorageService.get(EMAILS_STORAGE_KEY, id).then((mail) => {
        mail.isRead = false
        return asyncStorageService.put(EMAILS_STORAGE_KEY, mail)
        // .then((mail) => {
        //     return mail
        // })
    })
}

function setRead(id) {
    asyncStorageService.get(EMAILS_STORAGE_KEY, id).then((mail) => {
        mail.isRead = true
        return asyncStorageService.put(EMAILS_STORAGE_KEY, mail)
        // .then((mail) => {
        //     return mail
        // })
    })
}

function getDefaultFilter() {
    return { readFilter: 'All mails' }
}

function getDefaultSort() {
    return { sortByDate: true, sortBySubject: false }
}

// private functions:

function _createEmails() {
    let emails = storageService.loadFromStorage(EMAILS_STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = demoEmails
        storageService.saveToStorage(EMAILS_STORAGE_KEY, emails)
    }
}

function _createEmail({ toUser, subject, body }) {
    const mail = {}
    mail.id = utilService.makeId()
    mail.subject = subject
    mail.body = body
    mail.isRead = false
    mail.sentAt = Date.now()
    mail.removedAt = null
    mail.from = loggedinUser.email
    mail.shortFrom = _shortFrom(mail.from)
    mail.to = toUser
    return mail
}

function _sortMails(mails, sortBy) {
    if (sortBy === 'sortByDate') {
        const newMail = mails.sort(
            (mailA, mailB) => mailB.sentAt - mailA.sentAt
        )

        return newMail
    } else if (sortBy === 'sortBySubject') {
        return mails.sort((mailA, mailB) =>
            mailA.subject.localeCompare(mailB.subject)
        )
    }
}

function _shortFrom(str) {
    const atIndex = str.indexOf('@')

    if (atIndex !== -1) {
        return str.substring(0, atIndex)
    } else {
        return str
    }
}
