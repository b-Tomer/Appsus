import { utilService } from '../../../services/util.service.js'
import { MailActions as MailActions } from './mail-actions.jsx'

const { useState } = React

export function MailPreview({
    mail,
    onNavigate,
    onRemoveMail,
    onMarkUnread,
    onStarMail,
}) {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <tr
            className={
                mail.isRead
                    ? 'read mail-preview flex"'
                    : 'unread mail-preview flex"'
            }
            onClick={() => onNavigate(mail.id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <td className="mail-star">
                <button onClick={(event) => onStarMail(event, mail.id)}>
                    {mail.isStarred ? (
                        <i
                            className="fa-solid fa-star"
                            style={{ color: '#fbbc04' }}
                        ></i>
                    ) : (
                        <i
                            className="fa-regular fa-star"
                            style={{ color: '#6b6b6b' }}
                        ></i>
                    )}
                </button>
            </td>
            <td className="mail-from no-wrap">{mail.shortFrom} </td>
            <td className="mail-subject no-wrap">{mail.subject} </td>
            <td className="mail-body no-wrap">{mail.body}</td>
            {isHovered && (
                <MailActions
                    onRemoveMail={onRemoveMail}
                    onMarkUnread={onMarkUnread}
                    mailId={mail.id}
                />
            )}
            {!isHovered && (
                <td className="mail-date">
                    {utilService.getTimeFromStamp(mail.sentAt)}
                </td>
            )}
        </tr>
    )
}
