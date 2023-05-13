export function RateInput({ handleChange }) {
    return (
        <div className=".book-item-input">
            <label htmlFor="rate">Your rate: </label>
            <input
                onChange={handleChange}
                placeholder="1-10"
                type="number"
                min={0}
                max={10}
                name="rate"
                id="rate"
            />
        </div>
    )
}
