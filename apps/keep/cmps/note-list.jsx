const { useEffect, useState } = React


import { NotePreview } from "../../../note-preview.jsx"




export function NoteList({ notes }) {

    return (

        <section>

            <div className="note-list">{notes.map(note => <NotePreview key={note.id} note={note} />)}</div>

        </section>

    )
}

