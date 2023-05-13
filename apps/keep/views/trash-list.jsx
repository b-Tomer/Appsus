
import { NotePreview } from "../../../note-preview.jsx"


export function TrashList({trashNotes, cardsStyle, pinnedNotes, unpinnedNotes, onRemoveNote, onPinNote, onDuplicateNote }){
    return(
        <React.Fragment>


        <section className="pinned"><h6 className="pinn-title">Trash</h6>
            <div style={cardsStyle} className="note-list">{trashNotes.map(note =>
                <NotePreview onPinNote={onPinNote} onRemoveNote={onRemoveNote} key={note.id} note={note} onDuplicateNote={onDuplicateNote} />
            )}</div>
        </section>



    </React.Fragment>
    )
}