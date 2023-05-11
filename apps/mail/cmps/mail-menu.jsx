import { MailCompose } from '../cmps/mail-compose.jsx'
const { useEffect, useState } = React

export function MailMenu() {
    const [isCompose, setIsCompose] = useState(false)

    function onToggleCompose(event) {
        setIsCompose(!isCompose)
    }

    return (
        <React.Fragment>
            <button
                className="compose-mail"
                onClick={(event) => {
                    onToggleCompose(event)
                }}
            >
                <img src="../../../assets/icons/compose.svg" alt="" />
            </button>
            <ul className="mail-categories clean-list">
                <li>
                    <button className="mail-inbox">
                        <img src="../../../assets/icons/inbox.png" alt="" />
                    </button>
                </li>
                <li>
                    <button className="mail-star">
                        <img src="../../../assets/icons/star.png" alt="" />
                    </button>
                </li>
                <li>
                    <button className="mail-sent">
                        <img src="../../../assets/icons/send.png" alt="" />
                    </button>
                </li>
                <li>
                    <button className="mail-draft">
                        <img src="../../../assets/icons/draft.png" alt="" />
                    </button>
                </li>
                <li>
                    <button className="mail-trash">
                        <img src="../../../assets/icons/delete.png" alt="" />
                    </button>
                </li>
            </ul>

            {isCompose && <MailCompose />}
        </React.Fragment>
    )
}
