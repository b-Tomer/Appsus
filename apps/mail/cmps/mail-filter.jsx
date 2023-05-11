import { mailService } from '../services/mail.service.js'
const { useState, useEffect } = React

export function MailFilter({ onSetFilter, filterBy, onSetSortBy, sortBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit((prevFilterBy) => ({
            ...prevFilterBy,
            [field]: value,
        }))
    }

    const { readFilter } = filterByToEdit

    return (
        <section className="mail-filter">
            <form>
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
                {/* <button
                    className="sort-date"
                    onClick={this.props.onSetSort}
                    name="sortByDate"
                >
                    Sort by date
                </button>
                <button
                    className="sort-subject"
                    onClick={this.props.onSetSort}
                    name="sortBySubject"
                >
                    Sort by subject
                </button> */}
            </form>
        </section>
    )
}
