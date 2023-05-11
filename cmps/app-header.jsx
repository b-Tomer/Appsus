const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-main-nav">
        <Link to="/">
            
        </Link>
        <nav>
            <NavLink to="/"><img src="./assets/img/.jpg" alt="" /></NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail"><img src="./assets/img/gmail-icon.jpg" alt="" /></NavLink>
            <NavLink to="/keep">Keep</NavLink>
        </nav>
    </header>
}
