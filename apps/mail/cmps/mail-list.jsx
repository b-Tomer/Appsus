import { MailPreview as MailPreview } from './mail-preview.jsx'
import { MailFilter as MailFilter } from './mail-filter.jsx'
import { mailService } from '../services/mail.service.js'

const { useNavigate } = ReactRouterDOM
const { useEffect, useState } = React

export function MailList() {
    const navigate = useNavigate()
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [mails])

    function loadMails() {
        mailService.query().then((mails) => {
            setMails(mails)
        })
    }

    function onNavigate(id) {
        navigate(`/mail/${id}`)
        mailService.setRead(id).then(() => {
            setMails(mails)
        })
    }

    function onRemoveMail(ev, id) {
        ev.stopPropagation()
        if (confirm('Are you sure you wish to delete this email?')) {
            mailService.remove(id).then(() => {
                setMails(mails)
            })
        }
    }

    function onMarkUnread(ev, id) {
        ev.stopPropagation()
        mailService.setUnread(id).then(() => {
            setMails(mails)
        })
    }

    if (!mails || !mails.length)
        return (
            <React.Fragment>
                <h1 className="empty-list">There are no emails</h1>
            </React.Fragment>
        )
    return (
        <React.Fragment>
            <MailFilter />
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
        </React.Fragment>
    )
}
