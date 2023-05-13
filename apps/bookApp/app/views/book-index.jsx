import { BookAdd } from "../cmps/book-add.jsx"
import { BookFilter } from "../cmps/book-filter.jsx"
import { BookList } from "../cmps/book-list.jsx"
import { bookService } from "../services/book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"


const { useEffect, useState } = React

export function BookIndex() {
  const [books, setBooks] = useState([])

  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
    showSuccessMsg('Welcome to the librery!')
  }, [filterBy]);

  function loadBooks() {
    bookService.query(filterBy).then((books) => setBooks(books))
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId).then(() => {
      const updatedBooks = books.filter((book) => book.id !== bookId)
      setBooks(updatedBooks)
      showSuccessMsg(`Book removed!`)
    })
  }

  function onSetFilter(filterBy) {
    // console.log(filterBy)
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }))
  }


  return (
    <section className="book-index">

      <React.Fragment>
        <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <BookAdd />
        <BookList onRemoveBook={onRemoveBook} books={books} />
      </React.Fragment>


    </section>
  );
}
