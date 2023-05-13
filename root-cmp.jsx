const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

// import { About } from './cmps/about.jsx'
import { Home } from './views/home.jsx'
import { MailIndex } from './apps/mail/views/mail-index.jsx'
import { KeepIndex } from './apps/keep/views/keep-index.jsx'
import { BookHome } from './apps/bookApp/app/views/book-home.jsx'
import { About } from './apps/bookApp/app/views/about.jsx'
import { BookIndex } from './apps/bookApp/app/views/book-index.jsx'
import { BookDetails } from './apps/bookApp/app/views/book-details.jsx'
import { BookEdit } from './apps/bookApp/app/views/book-edit.jsx'

export function App() {
    return (
        <Router>
            <section className="app">
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/about" element={<About />} /> */}
                    <Route path="/mail" element={<MailIndex />} />
                    <Route path="/mail/:mailId" element={<MailIndex />} />
                    <Route path="/keep" element={<KeepIndex />} />
                    <Route path="/bookApp" element={<BookIndex />} />
                    <Route path="/bookApp/about" element={<About />} />
                    {/* <Route path="/bookApp/book" element={<BookIndex />} /> */}
                    <Route
                        path="/bookApp/book/:bookId"
                        element={<BookDetails />}
                    />
                    <Route
                        path="/bookApp/book/edit/:bookId"
                        element={<BookEdit />}
                    />
                </Routes>
            </section>
        </Router>
    )
}
