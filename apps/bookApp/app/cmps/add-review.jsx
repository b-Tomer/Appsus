const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { CommentInput } from './comment-input.jsx'
import { RateInput } from './rate-input.jsx'
import { StarInput } from './star-input.jsx'

export function AddReview({ bookId }) {

    const [newReview, setNewReview] = useState(null)
    const [bookToEdit, setBookToEdit] = useState(null)
    const navigate = useNavigate()
    const [cmpType, setCmpType] = useState('stars')

    useEffect(() => {
        if (bookId) loadBook()
        setNewReview(bookService.getEmptyReview())
    }, [])

    function loadBook() {
        bookService
            .get(bookId)
            .then(setBookToEdit)
            .catch((err) => {

                showErrorMsg('Book not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value =
            target.type === 'number' ? +target.value || '' : target.value 
        setNewReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        if (!bookToEdit.reviews) bookToEdit.reviews = [newReview]
        else bookToEdit.reviews.push(newReview)

        bookService.save(bookToEdit).then(() => {
            navigate('/bookApp')
        })
    }

    if (!newReview) return ''
    return (
        <div className="book-add-review">
            Add your review:
            <form onSubmit={onSaveBook}>
                <section>
                    <select
                        onChange={(ev) => {
                            setCmpType(ev.target.value)
                        }}
                    >
                        <option value="stars">Stars</option>
                        <option value="text">Comment</option>
                        <option value="rate">Rate</option>
                    </select>
                </section>
                <div className=".book-item-input">
                    <label htmlFor="name">Name: </label>
                    <input
                        onChange={handleChange}
                        placeholder="your name"
                        type="text"
                        name="name"
                        id="name"
                    />
                </div>
                <section>
                    <DynamicCmp
                        cmpType={cmpType}
                        name="tomer"
                        handleChange={handleChange}
                    />
                </section>

                <button className="save-btn">
                    {newReview.id ? 'Save' : 'Add'}
                </button>
            </form>
        </div>
    )
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'stars':
            return <StarInput {...props} />
        case 'text':
            return <CommentInput {...props} />
        case 'rate':
            return <RateInput {...props} />
    }
}
