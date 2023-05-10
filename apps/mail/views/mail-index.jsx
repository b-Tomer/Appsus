import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'

const { useEffect, useState } = React

export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query().then((mails) => {
            setMails(mails)
        })
    }

    return (
        <main className="mail-app ">
            <aside className="mail-menu"></aside>
            <div className="mails-list-container">
                <MailList mails={mails} />
            </div>
        </main>
    )
}
