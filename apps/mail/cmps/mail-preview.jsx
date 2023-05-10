import { utilService } from '../../../services/util.service.js'
import { MailActions as MailActions } from './mail-actions.jsx'

const { useState } = React

export function MailPreview({ mail, onNavigate }) {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <tr
            className="mail-preview flex"
            onClick={() => onNavigate(mail.id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <td className="mail-subject">{mail.subject} </td>
            <td className="mail-body no-wrap">{mail.body}</td>
            {isHovered && <MailActions />}
            {!isHovered && (
                <td className="mail-date">
                    {utilService.getTimeFromStamp(mail.sentAt)}
                </td>
            )}
        </tr>
    )
}
