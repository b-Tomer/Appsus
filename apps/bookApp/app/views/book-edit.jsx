const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(null)
    const navigate = useNavigate()
    const params = useParams()
    console.log('params:', params)

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])

    function loadBook() {
        bookService
            .get(params.bookId)
            .then(setBookToEdit)
            .catch((err) => {
                console.log('Had issued in book edit:', err)
                navigate('/bookApp')
                showErrorMsg('Book not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        console.log('field: ', field)
        const value =
            target.type === 'number' ? +target.value || '' : target.value
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))

        // switch (field) {
        //     case 'title':
        //         setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        //         break;
        //         case 'price':
        //         setBookToEdit(prevBook => ({ ...prevBook, [listPrice[amount]]: value }))

        // }
        // console.log('value: ',value);
    }
    // const price = bookToEdit.listPrice.amount

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit).then(() => {
            navigate('/bookApp')
        })
    }
    if (!bookToEdit) return <div>Loading...</div>
    console.log('bookToEdit: ', bookToEdit)
    return (
        <section className="book-edit">
            <h2>{bookToEdit.id ? 'Edit' : 'Add'} Book</h2>

            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Name: </label>
                <input
                    onChange={handleChange}
                    value={bookToEdit.title}
                    type="text"
                    name="title"
                    id="title"
                />

                <label htmlFor="price">Price: </label>
                <input
                    onChange={handleChange}
                    value={bookToEdit.listPrice.amount}
                    type="number"
                    name="price"
                    id="price"
                />

                <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
            </form>
        </section>
    )
}
