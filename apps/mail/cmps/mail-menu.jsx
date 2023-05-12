import { MailCompose } from '../cmps/mail-compose.jsx'
const { useEffect, useRef, useState } = React

export function MailMenu({
    onToggleCompose,
    isCompose,
    countUnread,
    mails,
    onSetFilter,
    filterBy,
}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const categoryRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ]

    useEffect(() => {
        categoryRefs[0].current.classList.add('selected')
        categoryRefs[0].current.classList.remove('unselected')
    }, [])

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    useEffect(() => {
        countUnread()
    }, [mails])

    function handleClick(index) {
        categoryRefs.forEach((ref, i) => {
            let field = ref.current.name
            let value
            if (i === index) {
                ref.current.classList.add('selected')
                ref.current.classList.remove('unselected')
                value = true
            } else {
                ref.current.classList.remove('selected')
                ref.current.classList.add('unselected')
                value = false
            }
            setFilterByToEdit((prevFilterBy) => ({
                ...prevFilterBy,
                [field]: value,
            }))
        })
    }

    return (
        <React.Fragment>
            <button
                className="compose-mail"
                onClick={(event) => {
                    onToggleCompose(event)
                }}
            >
                <img src="./assets/icons/compose.svg" alt="" />
            </button>
            <div className="mail-categories clean-list">
                <button
                    name="inbox"
                    className="mail-inbox"
                    onClick={() => handleClick(0)}
                    ref={categoryRefs[0]}
                >
                    <img src="./assets/icons/inbox.png" alt="" />
                    <span className="unread-count">{countUnread()}</span>
                </button>

                <button
                    name="starredMails"
                    className="mail-star unselected"
                    onClick={() => handleClick(1)}
                    ref={categoryRefs[1]}
                >
                    <img src="./assets/icons/star.png" alt="" />
                </button>

                <button
                    name="sentMails"
                    className="mail-sent unselected"
                    onClick={() => handleClick(2)}
                    ref={categoryRefs[2]}
                >
                    <img src="./assets/icons/send.png" alt="" />
                </button>

                <button
                    name="draftMails"
                    className="mail-draft unselected"
                    onClick={() => handleClick(3)}
                    ref={categoryRefs[3]}
                >
                    <img src="./assets/icons/draft.png" alt="" />
                </button>

                <button
                    name="trashMails"
                    className="mail-trash unselected"
                    onClick={() => handleClick(4)}
                    ref={categoryRefs[4]}
                >
                    <img src="./assets/icons/delete.png" alt="" />
                </button>
            </div>

            {isCompose && <MailCompose onToggleCompose={onToggleCompose} />}
        </React.Fragment>
    )
}
