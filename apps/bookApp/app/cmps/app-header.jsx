const { useState } = React
const { Link, NavLink } = ReactRouterDOM

export function BookAppHeader() {
    const [menuBtn, setMenuBtn] = useState(false)
    let menuClass = menuBtn ? 'open' : 'closed'

    return (
        <header className="app-header full book-main-layout">
            <h1>React Books App</h1>
            <nav className={`app-nav ${menuClass}`}>
                <NavLink onClick={() => setMenuBtn(false)} to="/">
                    Home
                </NavLink>
                <NavLink onClick={() => setMenuBtn(false)} to="/about">
                    About
                </NavLink>
                <NavLink onClick={() => setMenuBtn(false)} to="/bookApp">
                    Books
                </NavLink>
            </nav>
            <button
                onClick={() => setMenuBtn(!menuBtn)}
                className="book-menu-btn"
            >
                <i className="fa-solid fa-bars"></i>
            </button>
        </header>
    )
}
