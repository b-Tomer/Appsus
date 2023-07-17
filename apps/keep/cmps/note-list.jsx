

import { NotePreview } from "../../../note-preview.jsx"




export function NoteList({ cardsStyle, pinnedNotes, unpinnedNotes, onRemoveNote, onPinNote, onDuplicateNote, onEditNote }) {


    const pinnedTxt = (pinnedNotes.length > 0) ? 'Pinned: ' : ''

    return (

        <div className="all-list">


            <section className="pinned"><h6 className="pinn-title">{pinnedTxt}</h6>
                <div style={cardsStyle} className="note-list">{pinnedNotes.map(note =>
                    <NotePreview onEditNote={onEditNote} onPinNote={onPinNote} onRemoveNote={onRemoveNote} key={note.id} note={note} onDuplicateNote={onDuplicateNote} />
                )}</div>

            </section>
            <section className="others">
                <h6 className="pinn-title">Others:</h6>
            <div style={cardsStyle} className="note-list">{unpinnedNotes.map(note =>
                <NotePreview onEditNote={onEditNote} onPinNote={onPinNote} onRemoveNote={onRemoveNote} key={note.id} note={note} onDuplicateNote={onDuplicateNote} />
                )}</div>
                </section>



        </div>

    )
}

