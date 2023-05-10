import { MailPreview as MailPreview } from './mail-preview.jsx'
import { mailService } from '../services/mail.service.js'

// import { useNavigate } from 'react-router-dom'
const { useNavigate } = ReactRouterDOM
const { useState } = React

export function MailList({ mails }) {
    const navigate = useNavigate()
    // const [mail, setMail] = useState(initialState)

    function onNavigate(id) {
        navigate(`/mail/${id}`)
    }

    if (!mails || !mails.length)
        return (
            <React.Fragment>
                <h1 className="empty-list">There are no emails</h1>
            </React.Fragment>
        )
    return (
        <table className="mail-list">
            <tbody>
                {mails.map((mail) => (
                    <MailPreview
                        key={mail.id}
                        mail={mail}
                        onNavigate={onNavigate}
                    />
                ))}
            </tbody>
        </table>
    )
}
