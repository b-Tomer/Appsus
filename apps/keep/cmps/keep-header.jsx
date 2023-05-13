
const { useState } = React
const { NavLink } = ReactRouterDOM

export function KeepHeader() {

  const [menuBtn, setMenuBtn] = useState(false);
  let menuClass = menuBtn ? "open" : "closed";


  return (
    <header className="keep-header full main-layout">
      <div className="left-menu">
        <button onClick={() => setMenuBtn(!menuBtn)} className="btn menu-btn" >
          <i className="fa-solid fa-bars"></i>
        </button>
        <NavLink to="/keep" className="keeper-nav"><img className="icon" src="assets/img/keep-icon.png" alt="" /></NavLink>

        <span className="app-title">Keep</span>
      </div>

      <div className="right-menu">
        <section className="header-btns" >
          <button className="btn btn-opt search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>

          {/* <button className="btn btn-opt"><i className="fa-solid fa-table"></i></button> */}
        </section>
        <section className="nav-links">
          <NavLink to="/book" className="keep-icons "><div className=""><i className="bookk-icon fa-solid fa-book-open"></i></div></NavLink>
          <NavLink to="/mail" className="gmaill"><img className="gmaill-img animate__pulse" src="./assets/img/gmail-icon.png" alt="" /></NavLink>
          <NavLink to="/" className="keep-icons"><i className="bookk-icon fa-solid fa-house"></i></NavLink>

        </section>
      </div>

    </header>
  )
}
