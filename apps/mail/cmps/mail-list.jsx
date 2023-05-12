import { MailPreview as MailPreview } from './mail-preview.jsx'
import { MailFilter as MailFilter } from './mail-filter.jsx'
import { mailService } from '../services/mail.service.js'

const { useNavigate } = ReactRouterDOM
const { useEffect, useState } = React

export function MailList({
    onSetFilter,
    filterBy,
    isCompose,
    loadMails,
    sortBy,
    setSortBy,
    onSetSortBy,
    mails,
    setMails,
    onRemoveMail,
    onMarkUnread,
    countUnread,
    onStarMail,
}) {
    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
    }, [])

    useEffect(() => {
        loadMails()
    }, [filterBy, sortBy, isCompose, onStarMail, onMarkUnread, onRemoveMail])

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
            .then(loadMails)
            .catch((error) => {
                console.error('Failed to mark mail as read:', error)
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
                                onStarMail={onStarMail}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </React.Fragment>
    )
}
