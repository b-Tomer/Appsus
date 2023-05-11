

export function NoteTxt({note, cardStyle}){

    const background = (cardStyle.backgroundColor) ? cardStyle : note.style

    return(
        <div style={background} className="card txt-note">
            <h4 className="note-title">{note.title}</h4>
            <p>{note.info.txt}</p>
         
        </div>
    )
}