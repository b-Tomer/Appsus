const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { CommentInput } from './comment-input.jsx'
import { RateInput } from './rate-input.jsx'
import { StarInput } from './star-input.jsx'

export function AddReview({ bookId }) {
    // console.log(bookId);
    const [newReview, setNewReview] = useState(null)
    const [bookToEdit, setBookToEdit] = useState(null)
    const navigate = useNavigate()
    const [cmpType, setCmpType] = useState('stars')

    useEffect(() => {
        if (bookId) loadBook()
        setNewReview(bookService.getEmptyReview())
        // loadBook()
    }, [])

    function loadBook() {
        bookService
            .get(bookId)
            .then(setBookToEdit)
            .catch((err) => {
                console.log('Had issued in book edit:', err)
                showErrorMsg('Book not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        console.log('field: ', field)
        const value =
            target.type === 'number' ? +target.value || '' : target.value
        console.log('value: ', value)
        setNewReview((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        console.log(bookToEdit)
        if (!bookToEdit.reviews) bookToEdit.reviews = [newReview]
        else bookToEdit.reviews.push(newReview)

        bookService.save(bookToEdit).then(() => {
            navigate('/bookApp')
        })
    }

    // console.log('newReview: ',newReview)
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
