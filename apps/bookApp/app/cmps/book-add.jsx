const { useState, useEffect } = React;


import { bookService } from "../services/book.service.js";
import { GoogleList } from "./google-list.jsx";
import { showSuccessMsg } from "../services/event-bus.service.js"


export function BookAdd() {


    const [books, setBooks] = useState(null)

    function handleChange({ target }) {
        const value = target.type === 'number' ? (+target.value || '') : target.value
        bookService.getBooksFromGoogle(value).then(setBooks)
        
    }

    function onAddBook(book) {


        bookService.addGoogleBook(book)
            .then(() => {
                console.log('added new book');
                showSuccessMsg(`The book: ${book.title}  added דuccessfully!`)
            })
    }

    return (
        <section className="book-add">
            <h2>add book:</h2>

            <div className="">
                <label htmlFor="add"></label>
                <input onChange={handleChange} placeholder="search.." type="search" name="add" id="add" />
            </div>
           {books &&(
            < GoogleList books={books} onAddBook={onAddBook} />
            )}

        </section>
    )
}