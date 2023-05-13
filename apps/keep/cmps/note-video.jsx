

export function NoteVideo({onEditNote, note, cardStyle }) {

    const background = (cardStyle.backgroundColor) ? cardStyle : note.style

    return (
        <div onClick={()=>onEditNote(note)} style={background} className="card video-note">
            <h4 className="note-title">{note.info.title}</h4>
            <iframe src={note.info.url} frameBorder="0"></iframe>
        </div>
    )
}