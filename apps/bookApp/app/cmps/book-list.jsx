import { BookPreview } from './book-preview.jsx'
const { Link } = ReactRouterDOM
export function BookList({ books, onRemoveBook, onSelectBook }) {
    return (
        <ul className="book-list">
            {books.map((book) => (
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section className="book-list-btns">
                        <button
                            className="book-remove-btn"
                            onClick={() => onRemoveBook(book.id)}
                        >
                            X
                        </button>
                        <Link to={`/bookApp/book/${book.id}`}> Details </Link>
                        <Link to={`/bookApp/book/edit/${book.id}`}> Edit </Link>
                    </section>
                </li>
            ))}
        </ul>
    )
}
