import { mailService } from '../services/mail.service.js'
import { eventBusService } from '../../../services/event-bus.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailDetails } from '../cmps/mail-details.jsx'
import { MailMenu } from '../cmps/mail-menu.jsx'
import { MailHeader } from '../cmps/mail-header.jsx'
import { MailFooter } from '../cmps/mail-footer.jsx'

import { UserMsg } from '../../../cmps/user-msg.jsx'

const { useEffect, useState, useRef } = React
const { useParams, useNavigate, useLocation } = ReactRouterDOM

export function MailIndex() {
    const [isCompose, setIsCompose] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(mailService.getDefaultSort())
    const [replyTo, setReplyTo] = useState([''])
    const [replySubject, setReplySubject] = useState([''])
    const [replyBody, setReplyBody] = useState([''])

    const [mails, setMails] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const showUserMsgListener = eventBusService.on(
            'show-user-msg',
            (msg) => {
                console.log('Received show-user-msg event:', msg)
            }
        )
        return () => {
            showUserMsgListener()
        }
    }, [])

    function onSetSortBy(sortBy) {
        setSortBy((prevSortBy) => ({ ...prevSortBy, ...sortBy }))
    }

    function loadMails() {
        mailService
            .query(filterBy, sortBy)
            .then((mails) => {
                setMails(mails)
                countUnread(mails)
            })
            .catch((error) => {
                console.error('Failed to load mails:', error)
            })
    }

    function onRemoveMail(ev, id) {
        if (!id) return
        ev.stopPropagation()
        const currMail = mails.find((mail) => mail.id === id)
        if (currMail.isTrash) {
            if (confirm('Are you sure you wish to delete this email?')) {
                mailService
                    .remove(id)
                    .then(() => {
                        if (params && Object.keys(params).length > 0) {
                            navigate('/mail')
                        }
                        showSuccessMsg('Mail deleted successfully')
                    })
                    .then(loadMails)
                    .catch((error) => {
                        console.error('Failed to remove mail:', error)
                    })
            }
        } else {
            mailService
                .setTrash(id)
                .then(() => {
                    if (params && Object.keys(params).length > 0) {
                        navigate('/mail')
                    }
                    showSuccessMsg('Mail sent to trash successfully')
                })
                .then(loadMails)
                .catch((error) => {
                    console.error('Failed to trash mail:', error)
                })
        }
    }

    function onMarkUnread(ev, id) {
        if (!id || !ev) return
        ev.stopPropagation()
        mailService
            .setUnread(id)
            .then(loadMails)
            .then(() => {
                showSuccessMsg('Mail marked as unread')
            })
            .catch((error) => {
                console.error('Failed to mark mail as unread:', error)
            })
    }

    function onStarMail(ev, id) {
        if (!id) return
        ev.stopPropagation()
        mailService
            .toggleStarred(id)
            .then(loadMails)
            .catch((error) => {
                console.error('Failed to mark mail as star:', error)
            })
    }

    function onRestoreMail(ev, id) {
        if (!id) return
        ev.stopPropagation()
        if (confirm('Are you sure you wish to restore this email?')) {
            mailService
                .restoreMail(id)
                .then(() => {
                    showSuccessMsg('Mail restored successfully')
                })
                .then(loadMails)
                .catch((error) => {
                    console.error('Failed to restore mail :', error)
                })
        }
    }

    function countUnread() {
        let count = mails.reduce((acc, mail) => {
            if (mail.isRead === false) {
                return acc + 1
            }
            return acc
        }, 0)
        return count
    }

    function onSaveDraft(to, subject, body) {
        if (!to && !subject && !body) {
            showSuccessMsg('Must enter at least one parameter to save as draft')
            return
        }
        mailService
            .saveDraft(to || '', subject || '', body || '')
            .then(loadMails)
            .then(() => {
                showSuccessMsg('Mail saved to draft successfully')
            })
            .catch((error) => {
                console.error('Failed to save mail as draft :', error)
            })
    }

    function onEditDraft(ev, id) {
        ev.stopPropagation()
        mailService.get(id).then((currMail) => {
            console.log(currMail)
            setReplyTo(currMail.to)
            setReplySubject(currMail.subject)
            setReplyBody(currMail.body)
            onToggleCompose()
        })
    }

    function onReply(ev, id) {
        ev.stopPropagation()
        mailService.get(id).then((currMail) => {
            console.log(currMail)
            setReplyTo(currMail.from)
            setReplySubject(`Re: ${currMail.subject}`)
            setReplyBody(null)
            onToggleCompose()
        })
    }

    function onNewMail(ev) {
        ev.stopPropagation()
        setReplyTo(null)
        setReplySubject(null)
        setReplyBody(null)
        onToggleCompose()
    }

    function onSetFilter(filterBy) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
    }

    function onToggleCompose() {
        setIsCompose(!isCompose)
    }

    return (
        <div className="mail-app-container">
            <MailHeader onSetFilter={onSetFilter} filterBy={filterBy} />
            <main className="mail-app ">
                <aside className="mail-menu-container">
                    <MailMenu
                        onToggleCompose={onToggleCompose}
                        isCompose={isCompose}
                        mails={mails}
                        countUnread={countUnread}
                        onSetFilter={onSetFilter}
                        filterBy={filterBy}
                        onSaveDraft={onSaveDraft}
                        replyTo={replyTo}
                        replySubject={replySubject}
                        replyBody={replyBody}
                        onNewMail={onNewMail}
                    />
                </aside>

                {params && Object.keys(params).length > 0 ? (
                    <MailDetails
                        onRemoveMail={onRemoveMail}
                        onMarkUnread={onMarkUnread}
                        filterBy={filterBy}
                        onRestoreMail={onRestoreMail}
                        onEditDraft={onEditDraft}
                        onReply={onReply}
                    />
                ) : (
                    <div className="mails-list-container">
                        <MailList
                            onSetFilter={onSetFilter}
                            filterBy={filterBy}
                            onToggleCompose={onToggleCompose}
                            isCompose={isCompose}
                            onSaveDraft={onSaveDraft}
                            loadMails={loadMails}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            onSetSortBy={onSetSortBy}
                            mails={mails}
                            setMails={setMails}
                            onRemoveMail={onRemoveMail}
                            onMarkUnread={onMarkUnread}
                            countUnread={countUnread}
                            onStarMail={onStarMail}
                            onRestoreMail={onRestoreMail}
                            onEditDraft={onEditDraft}
                            replyTo={replyTo}
                            setReplyTo={setReplyTo}
                            onReply={onReply}
                        />
                    </div>
                )}
            </main>
            <MailFooter />
            <UserMsg />
        </div>
    )
}
