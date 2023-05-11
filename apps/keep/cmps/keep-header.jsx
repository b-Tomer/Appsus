
const { useState } = React
const { NavLink } = ReactRouterDOM

export function KeepHeader() {

  const [menuBtn, setMenuBtn] = useState(false);
  let menuClass = menuBtn ? "open" : "closed";


  return (
    <header className="keep-header full main-layout">
        <section className="header-btns" >
        <button className="btn btn-opt"><i className="fa-solid fa-circle-half-stroke"></i></button>
        <button className="btn btn-opt"><i className="fa-solid fa-table"></i></button>
        <button className="btn btn-opt"><i className="fa-solid fa-list"></i></button>
        <button className="btn btn-opt"><i className="fa-solid fa-magnifying-glass"></i></button>
        </section>

      <h1>Keep</h1><img className="icon" src="assets/img/keep-icon.png" alt="" />
      <nav className={`app-nav ${menuClass}`}>


        {/* <NavLink onClick={() => setMenuBtn(false)} to="/" >Home</NavLink>
        <NavLink onClick={() => setMenuBtn(false)} to="/about" >About</NavLink>
      <NavLink onClick={() => setMenuBtn(false)} to="/book" >Books</NavLink> */}
      </nav>
      <button onClick={() => setMenuBtn(!menuBtn)} className="btn menu-btn" >
        <i className="fa-solid fa-bars"></i>
      </button>

    </header>
  )
}
