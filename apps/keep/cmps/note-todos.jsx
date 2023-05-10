
export function NoteTodos({note}){

    return(
        <div className="card todos-note">
           <h2>{note.info.title}</h2>
           <ul>
            {note.info.todos.map(todo => `<li>${todo.txt}</li>`)}
           </ul>
        </div>
    )
}