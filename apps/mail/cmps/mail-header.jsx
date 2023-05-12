import { mailService } from '../services/mail.service.js'
const { Link, NavLink } = ReactRouterDOM

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
                className="mail-search"
                value={searchFilter}
                name="searchFilter"
                type="text"
                placeholder="Search mails"
                onChange={handleChange}
            />
            <nav className="nav-container">
                <NavLink to="/">
                    <div className=" home-container">
                        <i className="home-icon fa-solid fa-house-chimney"></i>
                    </div>
                </NavLink>

                <NavLink to="/keep">
                    <img
                        className="keep-icon"
                        src="./assets/img/keep-icon.png"
                        alt=""
                    />
                </NavLink>
            </nav>
        </header>
    )
}
