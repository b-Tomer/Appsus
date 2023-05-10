

export function NoteTodos({ note , cardStyle }) {
    // console.log(note);

    return (
        <div key={note.id} style={cardStyle} className="card todos-note">
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