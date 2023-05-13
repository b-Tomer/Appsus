export function CommentInput({ handleChange }) {
    return (
        <div className=".book-item-input">
            <label htmlFor="txt">Comments: </label>
            <input
                onChange={handleChange}
                placeholder="Describe your feelings about the book.."
                type="text"
                name="txt"
                id="txt"
            />
        </div>
    )
}
