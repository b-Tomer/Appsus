const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter


import { About } from './views/about.jsx'
import { Home } from './views/home.jsx'
import { MailIndex } from './apps/mail/views/mail-index.jsx'
import { MailDetails } from './apps/mail/views/mail-details.jsx'
import { KeepIndex } from './apps/keep/views/keep-index.jsx'

export function App() {
    return (
        <Router>
            <section className="app">
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />} />
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                    <Route path="/keep" element={<KeepIndex />} />
                </Routes>
            </section>
        </Router>
    )
}
