import { mailService } from '../services/mail.service.js'
const { useState, useEffect, useRef } = React

export function MailFilter({ onSetFilter, filterBy, onSetSortBy, sortBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [sortByToEdit, setSortByToEdit] = useState(sortBy)
    const sortRefs = [useRef(null), useRef(null)]

    useEffect(() => {
        onSetFilter(filterByToEdit)
        onSetSortBy(sortByToEdit)
    }, [filterByToEdit, sortByToEdit])

    useEffect(() => {
        sortRefs[0].current.style.backgroundColor = 'lightgray'
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
                ref.current.style.backgroundColor = 'lightgray'
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
    const { searchFilter } = filterByToEdit

    return (
        <section className="mail-filter">
            <form>
                <input
                    value={searchFilter}
                    name="searchFilter"
                    type="text"
                    placeholder="Search mails"
                    onChange={handleChange}
                />
                <input
                    value={readFilter}
                    name="readFilter"
                    type="text"
                    list="mailFilters"
                    id="mailFilterInput"
                    onChange={handleChange}
                />
                <datalist id="mailFilters">
                    <option value="All mails" />
                    <option value="Read" />
                    <option value="Unread" />
                </datalist>
                <button
                    className="sort-date"
                    onClick={(event) => handleClick(event, 0)}
                    name="sortByDate"
                    ref={sortRefs[0]}
                >
                    Sort by date
                </button>
                <button
                    className="sort-subject"
                    onClick={(event) => handleClick(event, 1)}
                    name="sortBySubject"
                    ref={sortRefs[1]}
                >
                    Sort by subject
                </button>
            </form>
        </section>
    )
}
