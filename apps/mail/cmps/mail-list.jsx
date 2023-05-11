import { MailPreview as MailPreview } from './mail-preview.jsx'
import { MailFilter as MailFilter } from './mail-filter.jsx'
import { mailService } from '../services/mail.service.js'

const { useNavigate } = ReactRouterDOM
const { useEffect, useState } = React

export function MailList({ onSetFilter, filterBy, isCompose }) {
    const navigate = useNavigate()
    const [mails, setMails] = useState([])
    const [sortBy, setSortBy] = useState(mailService.getDefaultSort())

    function onSetSortBy(sortBy) {
        setSortBy((prevSortBy) => ({ ...prevSortBy, ...sortBy }))
    }

    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy, isCompose])

    function loadMails() {
        mailService
            .query(filterBy, sortBy)
            .then((mails) => {
                setMails(mails)
            })
            .catch((error) => {
                console.error('Failed to load mails:', error)
            })
    }

    function onNavigate(id) {
        navigate(`/mail/${id}`)
        mailService
            .setRead(id)
            .then(() => {
                setMails((prevMails) => {
                    return prevMails.map((mail) => {
                        if (mail.id === id) {
                            return { ...mail, isRead: true }
                        }
                        return mail
                    })
                })
            })
            .catch((error) => {
                console.error('Failed to mark mail as read:', error)
            })
    }

    function onRemoveMail(ev, id) {
        ev.stopPropagation()
        if (confirm('Are you sure you wish to delete this email?')) {
            mailService
                .remove(id)
                .then(() => {
                    setMails((prevMails) => {
                        return prevMails.filter((mail) => mail.id !== id)
                    })
                })
                .catch((error) => {
                    console.error('Failed to remove mail:', error)
                })
        }
    }

    function onMarkUnread(ev, id) {
        ev.stopPropagation()
        mailService
            .setUnread(id)
            .then(() => {
                setMails((prevMails) => {
                    return prevMails.map((mail) => {
                        if (mail.id === id) {
                            return { ...mail, isRead: false }
                        }
                        return mail
                    })
                })
            })
            .catch((error) => {
                console.error('Failed to mark mail as unread:', error)
            })
    }

    return (
        <React.Fragment>
            <MailFilter
                onSetFilter={onSetFilter}
                filterBy={filterBy}
                onSetSortBy={onSetSortBy}
                sortBy={sortBy}
            />
            {!mails || !mails.length ? (
                <h1 className="empty-list">There are no emails</h1>
            ) : (
                <table className="mail-list">
                    <tbody>
                        {mails.map((mail) => (
                            <MailPreview
                                key={mail.id}
                                mail={mail}
                                onNavigate={onNavigate}
                                onRemoveMail={onRemoveMail}
                                onMarkUnread={onMarkUnread}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </React.Fragment>
    )
}
