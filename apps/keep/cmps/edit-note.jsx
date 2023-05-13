
const { useEffect, useState, useRef } = React


export function EditNote({ note, onSaveEdit, onCancelEdit }) {
    console.log("from editNote cmp: ",note);
    const [editedTitle, setEditedTitle] = useState(note.info.title)
    const [editedText, setEditedText] = useState(note.info.txt)

    function handleTitleChange({ target }) {
        setEditedTitle(target.value)
    }

    function handleTextChange({ target }) {
        setEditedText(target.value);
    }

    function handleSaveNote(){
        const updatedNote = {
            ...note,
            info: {
                ...note.info,
                title: editedTitle,
                txt: editedText,
                // todos:[
                //     ...note.info.todos,
                //     // editedTodos
                // ]
            },
        }
        onSaveEdit(updatedNote)
        onCancelEdit()
    }

    return (
        <div className="edit-container">
            <button className="btn edit-cancel" onClick={onCancelEdit}><i className="fa-solid fa-xmark"></i></button>
            <input className="edit-title" type="text" value={editedTitle} onChange={handleTitleChange} />
            <textarea className="edit-txt" value={editedText} onChange={handleTextChange} />
            <button className="btn edit-save" onClick={handleSaveNote}><i className="fa-solid fa-check"></i></button>
        </div>
    );
}