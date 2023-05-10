
export function NoteTodos({note}){
console.log(note);
    return(
        <div className="card todos-note">
           <h5>{note.info.title}</h5>
           <ul>
            {note.info.todos.map(todo => <li>todo.txt </li>
            
            // <input type="checkbox" id="todo" name="todo" checked>
            // <label for="todo">todo.txt</label>


            )}
           </ul>
        </div>
    )
}