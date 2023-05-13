import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React


export function Reviews({ bookId }) {

    const [bookToEdit, setBookToEdit] = useState(null)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        if (bookId) loadBook()
    }, [])
    // const reviews = bookToEdit ? bookToEdit.reviews : ''

    function loadBook() {

        bookService.get(bookId)
        .then((book) => {
            setBookToEdit(book)
            setReviews(book.reviews)
          })
            .catch(err => {
                console.log('Had issued in book edit:', err);
                showErrorMsg('Book not found!')
            })

    }

    function onRemoveReview(reviewId) {
        if (!reviews) return
        const updatedReviews = reviews.filter(review => review.id !== reviewId)
        const updatedBook = { ...bookToEdit, reviews: updatedReviews }
        bookService.save(updatedBook)
          .then(() => {
            console.log('deleted!!!')
            setReviews(updatedReviews)
            setBookToEdit(updatedBook)
          })
      }


    // console.log(reviews);
    // console.log(bookToEdit);
    if (!reviews || reviews.length === 0) return ''
    
    return (
        reviews.length ?
        reviews.map(review =>
          <div key={review.id} className="review">
            <h3>{review.name}</h3>
            <h3>{review.stars}⭐</h3>
            <h4>Comments: " {review.txt} "</h4>
            <button onClick={() => onRemoveReview(review.id)}>X</button>
          </div>
        ) :
        <div>No reviews yet</div>
    
    )
}