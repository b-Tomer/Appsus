import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailDetails } from '../cmps/mail-details.jsx'
import { MailMenu } from '../cmps/mail-menu.jsx'
import { MailHeader } from '../cmps/mail-header.jsx'

const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailIndex() {
    const [isCompose, setIsCompose] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(mailService.getDefaultSort())
    const [mails, setMails] = useState([])
    const params = useParams()
    const navigate = useNavigate()

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
                })
                .then(loadMails)
                .catch((error) => {
                    console.error('Failed to trash mail:', error)
                })
        }
    }

    function onMarkUnread(ev, id) {
        ev.stopPropagation()
        mailService
            .setUnread(id)
            .then(loadMails)
            .catch((error) => {
                console.error('Failed to mark mail as unread:', error)
            })
    }

    function onStarMail(ev, id) {
        ev.stopPropagation()
        mailService
            .toggleStarred(id)
            .then(loadMails)
            .catch((error) => {
                console.error('Failed to mark mail as star:', error)
            })
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

    function onSetFilter(filterBy) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
    }

    function onToggleCompose(event) {
        setIsCompose(!isCompose)
    }

    return (
        <React.Fragment>
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
                    />
                </aside>

                {params && Object.keys(params).length > 0 ? (
                    <MailDetails
                        onRemoveMail={onRemoveMail}
                        onMarkUnread={onMarkUnread}
                    />
                ) : (
                    <div className="mails-list-container">
                        <MailList
                            onSetFilter={onSetFilter}
                            filterBy={filterBy}
                            onToggleCompose={onToggleCompose}
                            isCompose={isCompose}
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
                        />
                    </div>
                )}
            </main>
        </React.Fragment>
    )
}
