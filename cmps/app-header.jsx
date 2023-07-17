const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-main-nav">
            <nav className="nav-container">
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
