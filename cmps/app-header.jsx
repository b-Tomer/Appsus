const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-main-nav">
            <nav className="nav-container">
                <NavLink to="/bookApp" className="book-img">
                    <div className="books-container">
                        <i className="book-icon img-icon fa-solid fa-book-open"></i>
                    </div>
                </NavLink>
                <NavLink to="/mail" className="mail-icon">
                    <img
                        className="icon-img mail animate__pulse"
                        src="./assets/img/gmail-icon.png"
                        alt=""
                    />
                </NavLink>
                <NavLink to="/keep" className="keep-icon">
                    <img
                        className="icon-img animate__pulse"
                        src="./assets/img/keep-icon.png"
                        alt=""
                    />
                </NavLink>
            </nav>
        </header>
    )
}
