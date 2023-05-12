const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { About } from './cmps/about.jsx'
import { Home } from './views/home.jsx'
import { MailIndex } from './apps/mail/views/mail-index.jsx'
import { KeepIndex } from './apps/keep/views/keep-index.jsx'

export function App() {
    return (
        <Router>
            <section className="app">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />} />
                    <Route path="/mail/:mailId" element={<MailIndex />} />
                    <Route path="/keep" element={<KeepIndex />} />
                </Routes>
            </section>
        </Router>
    )
}
