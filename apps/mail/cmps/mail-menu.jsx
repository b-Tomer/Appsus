import { MailCompose } from '../cmps/mail-compose.jsx'
const { useEffect, useRef } = React

export function MailMenu({ onToggleCompose, isCompose }) {
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

    function handleClick(index) {
        categoryRefs.forEach((ref, i) => {
            if (i === index) {
                ref.current.classList.add('selected')
                ref.current.classList.remove('unselected')
            } else {
                ref.current.classList.remove('selected')
                ref.current.classList.add('unselected')
            }
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
                    className="mail-inbox"
                    onClick={() => handleClick(0)}
                    ref={categoryRefs[0]}
                >
                    <img src="./assets/icons/inbox.png" alt="" />
                </button>

                <button
                    className="mail-star unselected"
                    onClick={() => handleClick(1)}
                    ref={categoryRefs[1]}
                >
                    <img src="./assets/icons/star.png" alt="" />
                </button>

                <button
                    className="mail-sent unselected"
                    onClick={() => handleClick(2)}
                    ref={categoryRefs[2]}
                >
                    <img src="./assets/icons/send.png" alt="" />
                </button>

                <button
                    className="mail-draft unselected"
                    onClick={() => handleClick(3)}
                    ref={categoryRefs[3]}
                >
                    <img src="./assets/icons/draft.png" alt="" />
                </button>

                <button
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
