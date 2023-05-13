
const { useState, useEffect } = React
const { useParams } = ReactRouterDOM



import { AddReview } from "../cmps/add-review.jsx"
import { LongTxt } from "../cmps/long-txt.jsx"
import { Reviews } from "../cmps/reviews.jsx"
import { bookService } from "../services/book.service.js"
const { Link } = ReactRouterDOM


export function BookDetails() {


    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const {bookId} = useParams()


    useEffect(() => {
        loadBook()
        loadNextBookId()
        loadPrevBookId()

    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Had issued in car details:', err);
            })
    }

    function loadNextBookId() {
        bookService.getNextBookId(bookId)
            .then(setNextBookId)
    }

    function loadPrevBookId() {
        bookService.getPrevBookId(bookId)
            .then(setPrevBookId)
    }


    function checkPages() {
        if (!book) return
        const pageCount = book.pageCount
        let pagesTxt
        if (pageCount > 500) pagesTxt = 'Serious reading'
        else if (pageCount > 200) pagesTxt = 'Decent reading'
        else if (pageCount < 100) pagesTxt = 'Light reading'
        return pagesTxt
    }

    checkVintage()
    function checkVintage() {
        if (!book) return
        const year = new Date().getFullYear()
        const publishDate = book.publishedDate
        const deff = year - publishDate
        let publishTxt = (deff > 10) ? 'Vintage' : 'New'
        return publishTxt
    }

    function priceClass() {
        if (!book) return
        let price = book.listPrice.amount
        let classPrice = ''
        if (price > 150) classPrice = 'red'
        if (price < 20) classPrice = 'green'
        return classPrice
    }

    function saleTxt() {
        if (!book) return
        let txt = ''
        let isOnsale = book.listPrice.isOnSale
        if (isOnsale) txt = 'ON SALE!'
        return txt
    }


    if (!book) return <div>Loading.....</div>


    return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h4>{book.subtitle}</h4>
            <h3>Author: {book.authors}</h3>
            <h4 className={priceClass()}>Price: {book.listPrice.amount} {book.listPrice.currencyCode} </h4>
            <h4 className="red">{saleTxt()}</h4>
            <h5>Pages: {book.pageCount} - {checkPages()}</h5>
            <h5>Publish at: {book.publishedDate} - {checkVintage()}</h5>
            <img src={book.thumbnail} />
            <LongTxt text={book.description} />
            <Reviews bookId={book.id} />
            <AddReview bookId={book.id} />
            <section className="next-btns">
            <Link to={`/book/${prevBookId}`}> Prev </Link>
            <Link to={`/book/${nextBookId}`}> Next </Link>
            </section>
            <Link className="back-btn" to="/book">Back</Link>


        </section>
    )

}