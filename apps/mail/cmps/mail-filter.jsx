import { mailService } from '../services/mail.service.js'
const { useState, useEffect, useRef } = React
const { useNavigate, useLocation } = ReactRouterDOM

export function MailFilter({ onSetFilter, filterBy, onSetSortBy, sortBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [sortByToEdit, setSortByToEdit] = useState(sortBy)
    const sortRefs = [useRef(null), useRef(null), useRef(null)]
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        let filterBy = queryParams.get('filterBy')
        let sortBy = queryParams.get('sortBy')
        setFilterByToEdit((prevFilterBy) => ({
            ...prevFilterBy,
            [filterBy]: true,
            [sortBy]: true,
        }))
        if (!filterBy) {
            filterBy = 'All mails'
            queryParams.set('filterBy', 'All mails')
            navigate({
                search: queryParams.toString(),
            })
        }
        if (!sortBy) {
            sortBy = 'sortByDate'
            queryParams.set('sortBy', 'sortByDate')
            navigate({
                search: queryParams.toString(),
            })
        }
        sortRefs.forEach((ref) => {
            const field = ref.current.name
            if (ref.current.name === sortBy) {
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

        const field = 'readFilter'
        const value = filterBy
        setFilterByToEdit((prevFilterBy) => ({
            ...prevFilterBy,
            [field]: value,
        }))
    }, [])

    useEffect(() => {
        onSetFilter(filterByToEdit)
        onSetSortBy(sortByToEdit)
    }, [filterByToEdit, sortByToEdit])

    function handleChange({ target }) {
        const queryParams = new URLSearchParams(location.search)
        const filterBy = target.value
        queryParams.set('filterBy', filterBy)
        navigate({
            search: queryParams.toString(),
        })
        const field = target.name
        const value = target.value
        setFilterByToEdit((prevFilterBy) => ({
            ...prevFilterBy,
            [field]: value,
        }))
        queryParams.set('filterBy', filterBy)
        navigate({
            search: queryParams.toString(),
        })
    }

    function handleClick(ev, idx) {
        const queryParams = new URLSearchParams(location.search)
        const sortBy = ev.target.name
        queryParams.set('sortBy', sortBy)
        navigate({
            search: queryParams.toString(),
        })
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
        queryParams.set('sortBy', sortBy)
        navigate({
            search: queryParams.toString(),
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
