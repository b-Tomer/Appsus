

export function NoteTodos({ note, cardStyle }) {

    const background = (cardStyle.backgroundColor) ? cardStyle : note.style

    return (
        <div key={note.id} style={background } className="card todos-note">
            <h5 className="note-title">{note.info.title}</h5>

            {note.info.todos.map(todo =>
                <div key={todo.id}>

                    <input type="checkbox" id="todo" name="todo" />
                    <label htmlFor="todo">{todo.txt}</label>

                </div>
            )}

        </div>
    )
}