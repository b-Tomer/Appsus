

const { Link, NavLink, Route , Routes } = ReactRouterDOM


import { KeepHeader } from "../cmps/keep-header.jsx";
import { UserMsg } from "../cmps/user-msg.jsx";
import { KeepAbout } from "../views/keep-about.jsx";
import { KeepHome } from "./keep-home.jsx";
import { KeepFooter } from "../cmps/keep-footer.jsx";


export function KeepIndex() {
    return (
    
      
        <section className= "note-inedx app main-layout ">
  
          <KeepHeader />
  
          <main>
              <NavLink to="/keep-about">About</NavLink>
  
            <Routes> 
              {/* <NavLink path="/keep" element={<KeepHome />} /> */}
              <Route path="/keep-about" element={<KeepAbout />} />
            </Routes>

          </main>
          {/* <UserMsg /> */}
          <KeepFooter />
        </section>
    

    )
}
