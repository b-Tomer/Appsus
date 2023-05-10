import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'

const { useEffect, useState } = React

export function MailIndex() {
    const [emails, setEmails] = useState([])

    useEffect(() => {
        mailService.test()
    })

    return (
        <div className="emails-container">
            <MailList />
        </div>
    )
}
