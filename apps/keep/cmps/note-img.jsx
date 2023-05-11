
export function NoteImg({ note, cardStyle }) {

    const background = (cardStyle.backgroundColor) ? cardStyle : note.style
    
    return (
        <div style={background} className="card img-note">
            <h4 className="note-title">{note.info.title}</h4>
            <img src={note.info.url} />
        </div>
    )
}