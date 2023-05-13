
export function NoteImg({onEditNote, note, cardStyle }) {
    const background = (cardStyle.backgroundColor) ? cardStyle : note.style
    return (
        <div onClick={()=>onEditNote(note)} style={background} className="card img-note">
            <h4>{note.info.title}</h4>
            <img src={note.info.url} />
        </div>
    )
}