

export function NoteTxt({ note, cardStyle, onEditNote }) {

    const background = (cardStyle.backgroundColor) ? cardStyle : note.style

    return (
        <div onClick={() => onEditNote(note)} style={background} className="card txt-note">
            <h4 className="note-title">{note.info.title}</h4>
            <p>{note.info.txt}</p>

        </div>
    )
}