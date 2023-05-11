import { AppHeader } from '../cmps/app-header.jsx'
import { About } from '../cmps/about.jsx'
import { MainFooter } from '../cmps/main-footer.jsx'

export function Home() {
    return <section className="home">
           <AppHeader />
           {/* <About/> */}
           <MainFooter/>
    </section>
}

