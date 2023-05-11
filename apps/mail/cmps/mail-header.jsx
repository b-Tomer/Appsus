import { mailService } from '../services/mail.service.js'
const { useState, useEffect } = React

export function MailHeader({ onSetFilter, filterBy }) {
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
    const { searchFilter } = filterByToEdit

    return (
        <header className="mail-header">
            <img className="logo" src="./assets/img/gmail-icon.png" alt="" />
            <input
                value={searchFilter}
                name="searchFilter"
                type="text"
                placeholder="Search mails"
                onChange={handleChange}
            />
        </header>
    )
}
