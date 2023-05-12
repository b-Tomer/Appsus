import { mailService } from '../services/mail.service.js'
const { useState, useEffect, useRef } = React

export function MailFilter({ onSetFilter, filterBy, onSetSortBy, sortBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [sortByToEdit, setSortByToEdit] = useState(sortBy)
    const sortRefs = [useRef(null), useRef(null), useRef(null)]

    useEffect(() => {
        onSetFilter(filterByToEdit)
        onSetSortBy(sortByToEdit)
    }, [filterByToEdit, sortByToEdit])

    useEffect(() => {
        sortRefs[0].current.style.backgroundColor = '#d3e3fd'
    }, [])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit((prevFilterBy) => ({
            ...prevFilterBy,
            [field]: value,
        }))
    }

    function handleClick(ev, idx) {
        ev.preventDefault()
        sortRefs.forEach((ref, i) => {
            const field = ref.current.name
            if (i === idx) {
                setSortByToEdit((prevSortBy) => ({
                    ...prevSortBy,
                    [field]: true,
                }))
                ref.current.style.backgroundColor = '#d3e3fd'
            } else {
                setSortByToEdit((prevSortBy) => ({
                    ...prevSortBy,
                    [field]: false,
                }))
                ref.current.style.backgroundColor = 'transparent'
            }
        })
    }

    const { readFilter } = filterByToEdit

    return (
        <section>
            <form className="mail-filter">
                <select
                    className="filter-read"
                    value={readFilter}
                    name="readFilter"
                    onChange={handleChange}
                >
                    <option value="All mails">All mails</option>
                    <option value="Read">Read</option>
                    <option value="Unread">Unread</option>
                </select>

                <button
                    className="sort-date"
                    onClick={(event) => handleClick(event, 0)}
                    name="sortByDate"
                    ref={sortRefs[0]}
                >
                    Sort by date
                </button>
                <button
                    className="sort-from"
                    onClick={(event) => handleClick(event, 1)}
                    name="sortByFrom"
                    ref={sortRefs[1]}
                >
                    Sort by from
                </button>
                <button
                    className="sort-subject"
                    onClick={(event) => handleClick(event, 2)}
                    name="sortBySubject"
                    ref={sortRefs[2]}
                >
                    Sort by subject
                </button>
            </form>
        </section>
    )
}
