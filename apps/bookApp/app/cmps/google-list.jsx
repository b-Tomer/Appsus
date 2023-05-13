

export function GoogleList({books, onAddBook}) {
    if(!books) return

    return(

        <ul>
        {books.map(book => {
           return <React.Fragment><li>{book.title}</li><button onClick={() => onAddBook(book)} className="">+</button></React.Fragment>
        })}
    </ul>

)

}