
const { useEffect, useRef } = React

export function KeepMenu({ onToggleCompose, isCompose }) {
    const categoryRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ]

    useEffect(() => {
        categoryRefs[0].current.parentElement.classList.add('selected')
    }, [])

    function handleClick(index) {
        categoryRefs.forEach((ref, i) => {
            if (i === index) {
                ref.current.parentElement.classList.add('selected')
            } else {
                ref.current.parentElement.classList.remove('selected')
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
            <ul className="mail-categories clean-list">
                <li>
                    <button
                        className="mail-inbox"
                        onClick={() => handleClick(0)}
                        ref={categoryRefs[0]}
                    >
                        <img src="./assets/icons/inbox.png" alt="" />
                    </button>
                </li>
                <li>
                    <button
                        className="mail-star"
                        onClick={() => handleClick(1)}
                        ref={categoryRefs[1]}
                    >
                        <img src="./assets/icons/star.png" alt="" />
                    </button>
                </li>
                <li>
                    <button
                        className="mail-sent"
                        onClick={() => handleClick(2)}
                        ref={categoryRefs[2]}
                    >
                        <img src="./assets/icons/send.png" alt="" />
                    </button>
                </li>
                <li>
                    <button
                        className="mail-draft"
                        onClick={() => handleClick(3)}
                        ref={categoryRefs[3]}
                    >
                        <img src="./assets/icons/draft.png" alt="" />
                    </button>
                </li>
                <li>
                    <button
                        className="mail-trash"
                        onClick={() => handleClick(4)}
                        ref={categoryRefs[4]}
                    >
                        <img src="./assets/icons/delete.png" alt="" />
                    </button>
                </li>
            </ul>

            {isCompose && <MailCompose onToggleCompose={onToggleCompose} />}
        </React.Fragment>
    )
}
