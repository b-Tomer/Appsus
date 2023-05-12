export function MailActions({
    onRemoveMail,
    mailId,
    onMarkUnread,
    filterBy,
    onRestoreMail,
}) {
    return (
        <td className="mail-actions flex">
            {filterBy.trashMails && (
                <button onClick={(event) => onRestoreMail(event, mailId)}>
                    <img src="./assets/icons/restore.png" alt="" />
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
    )
}
