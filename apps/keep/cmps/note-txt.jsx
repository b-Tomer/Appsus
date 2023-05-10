

export function NoteTxt({note}){
// console.log(note);
    return(
        <div className="card txt-note">
            <p>{note.info.txt}</p>
         
        </div>
    )
}