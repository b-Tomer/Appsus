const { useEffect, useState } = React


import { NotePreview } from "../../../note-preview.jsx"




export function NoteList({ notes, onRemoveNote ,onPinNote}) {

    function onHandleChange(val) {
        // console.log(val);
    }

    return (

        <React.Fragment>

            <input className="card add-box" type="search" placeholder="write somthing.." />
            <section className="pinned">pinned: </section>
            <div className="note-list">{notes.map(note => <NotePreview onPinNote={onPinNote} onRemoveNote={onRemoveNote} key={note.id} note={note} />)}</div>


        </React.Fragment>

    )
}

