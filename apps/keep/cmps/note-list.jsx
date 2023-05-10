const { useEffect, useState } = React


import { NotePreview } from "../../../note-preview.jsx"




export function NoteList({ pinnedNotes, unpinnedNotes, onRemoveNote, onPinNote }) {

    function onHandleChange(val) {
        // console.log(val);
    }



    return (

        <React.Fragment>

            <input className="card add-box" type="search" placeholder="write somthing.." />

            <section className="pinned"><h6>Pinned:</h6>
                <div className="note-list">{pinnedNotes.map(note =>
                    <NotePreview onPinNote={onPinNote} onRemoveNote={onRemoveNote} key={note.id} note={note} />
                )}</div>

            </section><h6>Others:</h6>
            <div className="note-list">{unpinnedNotes.map(note =>
                <NotePreview onPinNote={onPinNote} onRemoveNote={onRemoveNote} key={note.id} note={note} />
            )}</div>


        </React.Fragment>

    )
}

