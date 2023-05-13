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
    toggleStarred,
    setTrash,
    restoreMail,
    saveDraft,
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
        isStarred: true,
        isTrash: false,
        isDraft: false,
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
        isStarred: true,
        isDraft: false,
        isTrash: false,
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
        isStarred: false,
        isDraft: false,
        isTrash: true,
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
        isStarred: false,
        isDraft: false,
        isTrash: false,
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
        isStarred: true,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject: 'How do I embed a big file (>1 GB) in a C++ program?',
        body: 'Some people say: "Write DRY code". However, that is the last thing I care about. Even after 1 year in programming my main concern is the functionality. I have seen even senior developers not caring about aesthetics. Is this normal?',
        isRead: false,
        sentAt: 1551032930594,
        removedAt: null,
        from: 'user@appsus.com',
        shortFrom: _shortFrom('user@appsus.com'),
        to: 'user@appsus.com',
        isStarred: false,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject:
            'Why cant an OS be written in pure C or C++? Why are some certain parts of every OS w...?',
        body: 'Why cant an OS be written in pure C or C++? Why are some certain parts of every OS written in assembly? Ages ago when I built a realtime OS, it was written about 99% in pure C. The only part that wasnt (~50 lines) was what handled context switching. It required dumping and swapping the contents of registers. I may have been able to write it in C, but the “asm” block was actually quite easy to understand, and quite short. Other than that, there are instances where the optimiser of the day wasn’t able to produce equivalent instructions that were as efficient. Today? Im pretty sure that isnt true; provably. (fixed spelling)',
        isRead: false,
        sentAt: 1551532930594,
        removedAt: null,
        from: 'english-personalized-digest@quora.com',
        shortFrom: _shortFrom('english-personalized-digest@quora.com'),
        to: 'user@appsus.com',
        isStarred: true,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject: 'What is the most absurd code youve ever seen?',
        body: 'Everyone of us started writing the code, trying everything (since at that time it was a high level problem for us). One of my friends had no clue whatsoever about the problem, but he wanted to score well in the test.',
        isRead: false,
        sentAt: 1561532930594,
        removedAt: null,
        from: 'darkestsecrets-space@quora.com',
        shortFrom: _shortFrom('darkestsecrets-space@quora.com'),
        to: 'user@appsus.com',
        isStarred: false,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Your Google Play Order Receipt from May 10, 2023',
        body: 'By subscribing, you authorize us to charge you the subscription cost (as described above) automatically, charged to the payment method provided until canceled. Learn how to cancel. Keep this for your records.',
        isRead: true,
        sentAt: 1541532930594,
        removedAt: null,
        from: 'googleplay-noreply@google.com',
        shortFrom: _shortFrom('googleplay-noreply@google.com'),
        to: 'user@appsus.com',
        isStarred: true,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Purchase receipt',
        body: 'חשבונית מס / קבלה (מקור) מספר 132089272',
        isRead: true,
        sentAt: 1558532930594,
        removedAt: null,
        from: 'info@wolt.com',
        shortFrom: _shortFrom('info@wolt.com'),
        to: 'user@appsus.com',
        isStarred: false,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject:
            'Getting Started with LangChain: A Beginners Guide to Building LLM-Powered Applications | Leonie Monigatti in Towards Data Science',
        body: 'Since the release of ChatGPT, large language models (LLMs) have gained a lot of popularity. Although you probably don’t have enough money and computational resources to train an LLM from scratch in your basement, you can still use pre-trained LLMs to build something cool, such as:',
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'noreply@medium.com',
        shortFrom: _shortFrom('noreply@medium.com'),
        to: 'user@appsus.com',
        isStarred: false,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Eyal, אפשר להציע לך משהו מתוק? | הפלוס השבוע',
        body: 'הכי רחוק מתל אביב: המאפיות המתוקות שאסור לפספס מבריוש הטופי ברמת הגולן, דרך קרואסון הפטל במאפייה שמפנקת את תושבי העוטף, ועד הפה-או-שוקולה באילת. היכלי המאפה ששווים עצירה ',
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'plus@ynet.co.il',
        shortFrom: _shortFrom('plus@ynet.co.il'),
        to: 'user@appsus.com',
        isStarred: true,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject:
            'Upgrade your network knowledge with the Cisco Learning Network Store',
        body: 'By enabling new applications and businesses that connect everything, technological advances are generating more data than ever before. And with intent-based networking, data center teams can use that data and take advantage of automation to scale and secure their infrastructure. Our training helps you develop the skills you need to empower data center teams as they take on the challenge of big data.',
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'learningatcisco-noreply@cisco.com',
        shortFrom: _shortFrom('learningatcisco-noreply@cisco.com'),
        to: 'user@appsus.com',
        isStarred: false,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Israel kills senior Gaza commanders as rocke...',
        body: 'Israel kills senior Gaza commanders as rockets cause first death in Israel',
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: 'noreply@redditmail.com',
        shortFrom: _shortFrom('noreply@redditmail.com'),
        to: 'user@appsus.com',
        isStarred: false,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject: 'החשבונית החודשית שלך מוכנה לצפייה-STINGT',
        body: 'לקוחות STINGTV צופים בחשבונית נוחה יותר ומפורטת יותר באתר yes.  למעבר לצפייה בחשבונית החודשית שלכם  ',
        isRead: false,
        sentAt: Date.now(),
        removedAt: null,
        from: ' service_mail@stingtv.co.il',
        shortFrom: _shortFrom(' service_mail@stingtv.co.il'),
        to: 'user@appsus.com',
        isStarred: false,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject: 'אישור תשלום - עיריית תל-אביב יפו',
        body: 'מספר אישור תשלום: 087986',
        isRead: false,
        sentAt: 1658532930594,
        removedAt: null,
        from: 'TLVPaymentsDoNotReply@tlv.onmicrosoft.com',
        shortFrom: _shortFrom('TLVPaymentsDoNotReply@tlv.onmicrosoft.com'),
        to: 'user@appsus.com',
        isStarred: false,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject: 'Line up the perfect songs with the Play Queue',
        body: 'The Play Queue lets you customize your song lineup for any moment.Tap the three dots next to any song and select "Add to Queue". Use the Play Queue icon in your Now Playing view to change up the order.',
        isRead: false,
        sentAt: 1628532930594,
        removedAt: null,
        from: 'no-reply@spotify.com',
        shortFrom: _shortFrom('no-reply@spotify.com'),
        to: 'user@appsus.com',
        isStarred: false,
        isDraft: false,
        isTrash: false,
    },
    {
        id: utilService.makeId(),
        subject: 'How to support your employees mental health',
        body: 'ChatGPT can save hours of work, but some companies are banning it When ChatGPT, the artificial intelligence technology from OpenAI, was released this past November, workers across industries instantly recognized its benefits for crafting professional-sounding communications, creating presentations, generating strings of code, and much more. However, just as quickly, employers started identifying the risks of relying on this tool in the workplace. With more than 40% of surveyed workers using ChatGPT or other AI tools for work, according to a recent Fishbowl survey, employers have become increasingly concerned about exposure to privacy and trade secrets as well as doubts about the AI’s accuracy. That’s why, while some businesses have chosen to embrace the time-saving bot, other major businesses, including JP Morgan and Verizon, have elected to avoid the potential risks by banning the use of ChatGPT.". Use the Play Queue icon in your Now Playing view to change up the order.',
        isRead: false,
        sentAt: 1648532930594,
        removedAt: null,
        from: 'team@learn.mail.monday.com',
        shortFrom: _shortFrom('team@learn.mail.monday.com'),
        to: 'user@appsus.com',
        isStarred: true,
        isDraft: false,
        isTrash: false,
    },
]

const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }

_createEmails()

function query(filterBy = {}, sortBy = {}) {
    return asyncStorageService.query(EMAILS_STORAGE_KEY).then((mails) => {
        if (filterBy.searchFilter) {
            const regExp = new RegExp(filterBy.searchFilter, 'i')
            mails = mails.filter(
                (mail) =>
                    regExp.test(mail.subject) ||
                    regExp.test(mail.body) ||
                    regExp.test(mail.shortFrom)
            )
        }
        if (filterBy.readFilter === 'Read') {
            mails = mails.filter((mail) => mail.isRead)
        }
        if (filterBy.readFilter === 'Unread') {
            mails = mails.filter((mail) => !mail.isRead)
        }
        if (filterBy.inbox === true) {
            mails = mails.filter(
                (mail) =>
                    mail.from !== loggedinUser.email &&
                    !mail.isTrash &&
                    !mail.isDraft
            )
        }
        if (filterBy.sentMails === true) {
            mails = mails.filter(
                (mail) =>
                    mail.from === loggedinUser.email &&
                    !mail.isTrash &&
                    !mail.isDraft
            )
        }
        if (filterBy.starredMails === true) {
            mails = mails.filter(
                (mail) => mail.isStarred && !mail.isTrash && !mail.isDraft
            )
        }
        if (filterBy.trashMails === true) {
            mails = mails.filter((mail) => mail.isTrash && !mail.isDraft)
        }
        if (filterBy.draftMails === true) {
            mails = mails.filter((mail) => mail.isDraft && !mail.isTrash)
        }

        if (sortBy.sortByDate) mails = _sortMails(mails, 'sortByDate')
        else if (sortBy.sortBySubject)
            mails = _sortMails(mails, 'sortBySubject')
        else if (sortBy.sortByFrom) mails = _sortMails(mails, 'sortByFrom')
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
    return asyncStorageService.get(EMAILS_STORAGE_KEY, id).then((mail) => {
        mail.isRead = false
        return asyncStorageService.put(EMAILS_STORAGE_KEY, mail)
    })
}

function setRead(id) {
    return asyncStorageService.get(EMAILS_STORAGE_KEY, id).then((mail) => {
        mail.isRead = true
        return asyncStorageService.put(EMAILS_STORAGE_KEY, mail)
    })
}

function setTrash(id) {
    return asyncStorageService.get(EMAILS_STORAGE_KEY, id).then((mail) => {
        mail.isTrash = true
        return asyncStorageService.put(EMAILS_STORAGE_KEY, mail)
    })
}

function restoreMail(id) {
    return asyncStorageService.get(EMAILS_STORAGE_KEY, id).then((mail) => {
        mail.isTrash = false
        return asyncStorageService.put(EMAILS_STORAGE_KEY, mail)
    })
}

function toggleStarred(id) {
    return asyncStorageService.get(EMAILS_STORAGE_KEY, id).then((mail) => {
        mail.isStarred = !mail.isStarred
        return asyncStorageService.put(EMAILS_STORAGE_KEY, mail)
    })
}

function saveDraft(to, subject, body) {
    // console.log(`${to}, ${subject}, ${body}`)
    const mailTemplate = { toUser: to, subject, body }
    console.log(mailTemplate)
    const newMail = _createEmail(mailTemplate)
    newMail.isDraft = true
    return asyncStorageService.post(EMAILS_STORAGE_KEY, newMail)
}

function getDefaultFilter() {
    return {}
}

function getDefaultSort() {
    return { sortByDate: true, sortBySubject: false, sortByFrom: false }
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
    console.log(`${toUser}, ${subject}, ${body}`)
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
    mail.isStarred = false
    mail.isTrash = false
    mail.isDraft = false
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
    } else if (sortBy === 'sortByFrom') {
        return mails.sort((mailA, mailB) =>
            mailA.from.localeCompare(mailB.from)
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
