import { MailCompose } from '../cmps/mail-compose.jsx'
const { useEffect, useRef, useState } = React
const { useNavigate, useLocation } = ReactRouterDOM

export function MailMenu({
    onToggleCompose,
    isCompose,
    countUnread,
    mails,
    onSetFilter,
    filterBy,
    onSaveDraft,
    inputRefs,
    replyTo,
    replySubject,
    replyBody,
    onNewMail,
}) {
    const navigate = useNavigate()
    const location = useLocation()
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const categoryRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ]

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        let category = queryParams.get('category')
        setFilterByToEdit((prevFilterBy) => ({
            ...prevFilterBy,
            [category]: true,
        }))
        if (!category) {
            category = 'inbox'
            queryParams.set('category', 'inbox')
            navigate({
                search: queryParams.toString(),
            })
        }
        categoryRefs.forEach((ref) => {
            let field = ref.current.name
            let value
            const elSpanChild = ref.current.querySelector('span')
            if (ref.current.name === category) {
                ref.current.classList.add('selected')
                ref.current.classList.remove('unselected')
                elSpanChild.style.display = 'inline'
                value = true
            } else {
                ref.current.classList.remove('selected')
                ref.current.classList.add('unselected')
                elSpanChild.style.display = 'none'
                value = false
            }
            setFilterByToEdit((prevFilterBy) => ({
                ...prevFilterBy,
                [field]: value,
            }))
        })
    }, [])

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    useEffect(() => {
        countUnread()
    }, [mails])

    function handleClick(index) {
        const queryParams = new URLSearchParams(location.search)
        const category = categoryRefs[index].current.name

        queryParams.set('category', category)
        navigate({
            search: queryParams.toString(),
        })

        categoryRefs.forEach((ref, i) => {
            let field = ref.current.name
            let value
            const elSpanChild = ref.current.querySelector('span')
            if (i === index) {
                ref.current.classList.add('selected')
                ref.current.classList.remove('unselected')
                value = true
                elSpanChild.style.display = 'inline'
            } else {
                ref.current.classList.remove('selected')
                ref.current.classList.add('unselected')
                value = false
                elSpanChild.style.display = 'none'
            }
            setFilterByToEdit((prevFilterBy) => ({
                ...prevFilterBy,
                [field]: value,
            }))
        })
        queryParams.set('category', category)
        navigate({
            search: queryParams.toString(),
        })
    }

    return (
        <React.Fragment>
            <button
                className="compose-mail"
                onClick={(event) => {
                    onNewMail(event)
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
                    <span className="unread-count">{countUnread()}</span>
                </button>

                <button
                    name="sentMails"
                    className="mail-sent unselected"
                    onClick={() => handleClick(2)}
                    ref={categoryRefs[2]}
                >
                    <img src="./assets/icons/send.png" alt="" />
                    <span className="unread-count">{countUnread()}</span>
                </button>

                <button
                    name="draftMails"
                    className="mail-draft unselected"
                    onClick={() => handleClick(3)}
                    ref={categoryRefs[3]}
                >
                    <img src="./assets/icons/draft.png" alt="" />
                    <span className="unread-count">{countUnread()}</span>
                </button>

                <button
                    name="trashMails"
                    className="mail-trash unselected"
                    onClick={() => handleClick(4)}
                    ref={categoryRefs[4]}
                >
                    <img src="./assets/icons/delete.png" alt="" />
                    <span className="unread-count">{countUnread()}</span>
                </button>
            </div>

            {isCompose && (
                <MailCompose
                    onToggleCompose={onToggleCompose}
                    onSaveDraft={onSaveDraft}
                    inputRefs={inputRefs}
                    replyTo={replyTo}
                    replySubject={replySubject}
                    replyBody={replyBody}
                />
            )}
        </React.Fragment>
    )
}
