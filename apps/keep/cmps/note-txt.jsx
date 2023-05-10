

export function NoteTxt({note, cardStyle}){
// console.log(note);
    return(
        <div style={cardStyle} className="card txt-note">
            <p>{note.info.txt}</p>
         
        </div>
    )
}