import { MailPreview as MailPreview } from './mail-preview.jsx'

export function MailList({ mails }) {
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
                    <MailPreview key={mail.id} mail={mail} />
                ))}
            </tbody>
        </table>
    )
}
