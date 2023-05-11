const { useEffect, useState } = React


import { NotePreview } from "../../../note-preview.jsx"




export function NoteList({ pinnedNotes, unpinnedNotes, onRemoveNote, onPinNote ,onDuplicateNote}) {

   
    let pinnedTxt = (pinnedNotes.length > 0) ? 'Pinned: ' : ''



    return (

        <React.Fragment>
 

            <section className="pinned"><h6 className="pinn-title">{pinnedTxt}</h6>
                <div className="note-list">{pinnedNotes.map(note =>
                    <NotePreview onPinNote={onPinNote} onRemoveNote={onRemoveNote} key={note.id} note={note} onDuplicateNote={onDuplicateNote} />
                )}</div>

            </section><h6 className="pinn-title">Others:</h6>
            <div className="note-list">{unpinnedNotes.map(note =>
                <NotePreview onPinNote={onPinNote} onRemoveNote={onRemoveNote} key={note.id} note={note} onDuplicateNote={onDuplicateNote} />
            )}</div>


        </React.Fragment>

    )
}

