// import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailMenu } from '../cmps/mail-menu.jsx'

export function MailIndex() {
    return (
        <main className="mail-app ">
            <aside className="mail-menu-container">
                <MailMenu />
            </aside>
            <div className="mails-list-container">
                <MailList />
            </div>
        </main>
    )
}
