

const { Link, NavLink, Route, Routes } = ReactRouterDOM
const { useEffect, useState } = React


import { KeepHeader } from "../cmps/keep-header.jsx";
import { UserMsg } from "../cmps/user-msg.jsx";
import { KeepFooter } from "../cmps/keep-footer.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import { keepService } from "../services/keep.service.js";



export function KeepIndex() {

  const [notes, setNotes] = useState([])

  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);
  // const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  //
  useEffect(() => {
    loadNotes()
    // showSuccessMsg('Welcome to the Keeper!')
  }, [pinnedNotes]);

  function loadNotes() {
    keepService.query().then((notes) => setNotes(notes))
  }

  function onRemoveNote(noteId){
    // console.log("noteId from onRemove: ", noteId);
    keepService.remove(noteId).then(() => {
      const updatedNotes = notes.filter((note) => note.id !== noteId)
      setNotes(updatedNotes)
      //   showSuccessMsg(`Note removed!`)
    })    
  }
  
  function onPinNote(noteId){
    
    keepService.get(noteId).then((note) => {
      note.isPinned = note.isPinned? false : true
      keepService.put(note)
        // console.log(note); 
      // const updatedNotes = keepService.query()
      // setNotes(updatedNotes)
  })
    }



  return (

    <section className="note-inedx app main-layout ">
      <KeepHeader />
      <main className="keep-content">

        <NoteList pinnedNotes={pinnedNotes} unpinnedNotes={unpinnedNotes} onRemoveNote={onRemoveNote} onPinNote={onPinNote} notes={notes} />

      </main>
      {/* <UserMsg /> */}
      <KeepFooter />
    </section>

  )
}
