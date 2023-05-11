const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-main-nav">
        <Link to="/">
            <h3>LOGO!</h3>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/keep">Keep</NavLink>
        </nav>
    </header>
}
