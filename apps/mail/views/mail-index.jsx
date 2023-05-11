import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailMenu } from '../cmps/mail-menu.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'

const { useEffect, useState } = React

export function MailIndex() {
    const [isCompose, setIsCompose] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    function onSetFilter(filterBy) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
    }

    function onToggleCompose(event) {
        setIsCompose(!isCompose)
    }

    return (
        <main className="mail-app ">
            <aside className="mail-menu-container">
                <MailMenu
                    onToggleCompose={onToggleCompose}
                    isCompose={isCompose}
                />
            </aside>
            <div className="mails-list-container">
                <MailList onSetFilter={onSetFilter} filterBy={filterBy} />
            </div>
        </main>
    )
}
