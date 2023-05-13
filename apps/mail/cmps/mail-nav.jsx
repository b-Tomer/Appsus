const { Link, NavLink } = ReactRouterDOM

export function MailNav() {
    return (
        <nav className="nav-container">
            <NavLink to="/">
                <div className="home-container">
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
            <NavLink to="/book">
                <div className="books-container">
                    <i className="books-icon fa-solid fa-book-open"></i>
                </div>
            </NavLink>
        </nav>
    )
}
