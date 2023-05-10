import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
    return (
        <tr className="mail-preview flex">
            <td className="mail-subject">{mail.subject}</td>
            <td className="mail-body">{mail.body}</td>
            <td className="mail-date">
                {utilService.getTimeFromStamp(mail.sentAt)}
            </td>
        </tr>
    )
}
