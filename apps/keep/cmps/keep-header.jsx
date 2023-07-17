const { useState } = React
const { NavLink } = ReactRouterDOM

export function KeepHeader({onSetSearch}) {
  const [menuBtn, setMenuBtn] = useState(false)
  let menuClass = menuBtn ? 'open' : 'closed'


function handleSearchChange({target}){
  const val= target.value
  onSetSearch(val)
}

  return (
    <header className="keep-header full main-layout">
      <div className="left-menu">
        <button onClick={() => setMenuBtn(!menuBtn)} className="btn menu-btn" >
          <i className="fa-solid fa-bars"></i>
        </button>
        <NavLink to="/keep" className="keeper-nav"><img className="icon" src="assets/img/keep-icon.png" alt="" /></NavLink>

        <span className="app-title">Keep</span>
      </div>
      <form htmlFor="search" className="search-form" >
        <input onChange={handleSearchChange} id="search" className="search-bar" type="search" placeholder="Search" />
        <button type="submit" className="btn btn-opt search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
      </form>

      <div className="right-menu">
        <section className="header-btns" >


        </section>
        <section className="nav-links">
          <NavLink to="/mail" className="gmaill"><img className="gmaill-img animate__pulse" src="./assets/img/gmail-icon.png" alt="" /></NavLink>
          <NavLink to="/" className="keep-icons"><i className="bookk-icon fa-solid fa-house"></i></NavLink>

        </section>
      </div>

    </header>
  )
}
