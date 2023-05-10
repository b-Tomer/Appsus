export function MailActions({ onRemoveMail, mailId }) {
    return (
        <td className="mail-actions flex">
            <button>
                <img src="../../../assets/icons/reply.png" alt="" />
            </button>
            <button onClick={(event) => onRemoveMail(event, mailId)}>
                <img src="../../../assets/icons/delete.png" alt="" />
            </button>
            <button>
                <img src="../../../assets/icons/mark_as_unread.png" alt="" />
            </button>
        </td>
    )
}
