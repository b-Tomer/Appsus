import { mailService } from '../services/mail.service.js'
import { MailHeader } from './mail-header.jsx'
import { MailMenu } from './mail-menu.jsx'
import { MailActions as MailActions } from './mail-actions.jsx'

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailDetails({ onRemoveMail, onMarkUnread }) {
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService
            .get(params.mailId)
            .then(setMail)
            .catch((err) => {
                console.log(err)
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>
    return (
        <section className="email-deatils">
            <table className="email-details-tools">
                <tbody>
                    <tr className="details-actions-container">
                        <button className="details-back" onClick={onBack}>
                            <img src="./assets/icons/back.png" alt="" />
                        </button>
                        <MailActions
                            onRemoveMail={onRemoveMail}
                            onMarkUnread={onMarkUnread}
                            mailId={params.mailId}
                        />
                    </tr>
                </tbody>
            </table>
            <div className="email-details-content">
                <p className="details-subject">Subject: {mail.subject}</p>
                <p className="details-from">From: {mail.from}</p>
                <p className="details-body">{mail.body}</p>
            </div>
        </section>
    )
}
