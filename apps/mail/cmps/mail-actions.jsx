import { MailCompose } from '../cmps/mail-compose.jsx'

export function MailActions({
    onRemoveMail,
    mailId,
    onMarkUnread,
    filterBy,
    onRestoreMail,
    onEditDraft,
    isCompose,
    onSaveDraft,
    onToggleCompose,
}) {
    return (
        <React.Fragment>
            <td className="mail-actions flex">
                {filterBy && filterBy.trashMails && (
                    <button onClick={(event) => onRestoreMail(event, mailId)}>
                        <img src="./assets/icons/restore.png" alt="" />
                    </button>
                )}
                {filterBy && filterBy.draftMails && (
                    <button onClick={(event) => onEditDraft(event, mailId)}>
                        <img src="./assets/icons/edit.png" alt="" />
                    </button>
                )}
                <button>
                    <img src="./assets/icons/reply.png" alt="" />
                </button>
                <button onClick={(event) => onRemoveMail(event, mailId)}>
                    <img src="./assets/icons/delete.png" alt="" />
                </button>
                <button onClick={(event) => onMarkUnread(event, mailId)}>
                    <img src="./assets/icons/mark_as_unread.png" alt="" />
                </button>
            </td>
            {isCompose && (
                <MailCompose
                    onToggleCompose={onToggleCompose}
                    onSaveDraft={onSaveDraft}
                />
            )}
        </React.Fragment>
    )
}
