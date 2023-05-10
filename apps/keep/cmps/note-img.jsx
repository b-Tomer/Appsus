
export function NoteImg({ note ,cardStyle }) {

    return (
        <div style={cardStyle} className="card img-note">
            <h2>{note.info.title}</h2>
            <img src={note.info.url} />
        </div>
    )
}