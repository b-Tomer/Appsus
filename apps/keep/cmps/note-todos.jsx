

export function NoteTodos({ note }) {
    // console.log(note);

    return (
        <div key={note.id} className="card todos-note">
            <h5>{note.info.title}</h5>

            {note.info.todos.map(todo =>
                <div key={todo.id}>

                    <input type="checkbox" id="todo" name="todo" />
                    <label htmlFor="todo">{todo.txt}</label>

                </div>
            )}
          
        </div>
    )
}