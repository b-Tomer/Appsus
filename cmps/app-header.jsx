const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-main-nav">
      
        <nav className="nav-container">
            <NavLink to="/"><div className="home-container"><i class="home-icon icon-img animate__pulse fa-solid fa-house-chimney"></i></div></NavLink>
            <NavLink to="/mail"><img className="icon-img animate__pulse" src="./assets/img/gmail-icon.png" alt="" /></NavLink>
            <NavLink to="/keep"><img className="icon-img animate__pulse" src="./assets/img/keep-icon.png" alt="" /></NavLink>
        </nav>
    </header>
}
