export function BookPreview({ book }) {

    return (
        <article className="book-preview">
            <h2>Book name: {book.title}</h2>
            
            <img src={book.thumbnail} alt="" />
        </article>
    )
}