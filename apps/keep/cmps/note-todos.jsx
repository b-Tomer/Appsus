
export function NoteTodos({note}){
console.log(note);
    return(
        <div className="card todos-note">
           <h5>{note.info.title}</h5>
           
            {note.info.todos.map(todo => <React.Fragment>
                <span>
            <input type="checkbox" id="todo" name="todo" />
            <label for="todo">{todo.txt}</label>
                </span>
          
            </React.Fragment> 

            )}
           
        </div>
    )
}