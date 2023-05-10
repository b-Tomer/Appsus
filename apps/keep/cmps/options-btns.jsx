

export function OptionsBtns({ onRemoveNote, onPinNote, note }) {





    return (

        <section className="options-container">
            <button className="options-btn"><i className="fa-regular fa-copy"></i></button>
            <button onClick={() => onPinNote(note.id)} className="options-btn"><i className="fa-solid fa-thumbtack"></i></button>
            <button className="options-btn"><i className="fa-solid fa-envelope"></i></button>
            <button className="options-btn"><i className="fa-solid fa-palette"></i></button>
            <button onClick={() => onRemoveNote(note.id)} className="options-btn"><i className="fa-solid fa-trash-can"></i></button>
        </section>
    )
}