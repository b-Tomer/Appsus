
export function NoteImg({ note }) {

    return (
        <div className="card img-note">
            <h2>{note.info.title}</h2>
            <img src={note.info.url} />
        </div>
    )
}