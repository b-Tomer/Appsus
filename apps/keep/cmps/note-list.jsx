const { useEffect, useState } = React


import { NotePreview } from "../../../note-preview.jsx"
import { utilService } from "../../../services/util.service.js"




export function NoteList({ cardsStyle, pinnedNotes, unpinnedNotes, onRemoveNote, onPinNote, onDuplicateNote }) {


    const pinnedTxt = (pinnedNotes.length > 0) ? 'Pinned: ' : ''

    return (

        <React.Fragment>


            <section className="pinned"><h6 className="pinn-title">{pinnedTxt}</h6>
                <div style={cardsStyle} className="note-list">{pinnedNotes.map(note =>
                    <NotePreview onPinNote={onPinNote} onRemoveNote={onRemoveNote} key={note.id} note={note} onDuplicateNote={onDuplicateNote} />
                )}</div>

            </section><h6 className="pinn-title">Others:</h6>
            <div style={cardsStyle} className="note-list">{unpinnedNotes.map(note =>
                <NotePreview onPinNote={onPinNote} onRemoveNote={onRemoveNote} key={note.id} note={note} onDuplicateNote={onDuplicateNote} />
            )}</div>


        </React.Fragment>

    )
}

