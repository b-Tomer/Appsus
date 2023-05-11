

const { Link, NavLink, Route, Routes } = ReactRouterDOM
const { useEffect, useState ,useRef } = React


import { KeepHeader } from "../cmps/keep-header.jsx";
import { UserMsg } from "../cmps/user-msg.jsx";
import { KeepFooter } from "../cmps/keep-footer.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import { keepService } from "../services/keep.service.js";
import { AddInbox } from "../cmps/add-inbox.jsx";
import { OpenAddInbox } from "../cmps/open-add-inbox.jsx";
import { utilService } from "../../../services/util.service.js";
import { KeepMenu } from "../cmps/keep-menu.jsx";



export function KeepIndex() {

  const [notes, setNotes] = useState([])
  const [isAddOpen, setIsAddOpen] = useState(true)
  const [isAddboxShown, setIsAddboxShown] = useState(false)
  const [newNote, setNewNote] = useState('')
  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);
  const boxRef = useRef()
  // const [filterBy, setFilterBy] = useState(keepService.getDefaultFilter())
  //


  useEffect(() => {
    loadNotes()
  }, [newNote,notes]);

  function loadNotes() {
    keepService.query().then(setNotes)
  }


  function onAddNewNote(newNote) {
    if (!newNote.title && !newNote.info.txt) return
    keepService.save(newNote).then((note)=>{
      notes.push(note)
      const updatedNotes = notes
      console.log(updatedNotes);
      setNotes(updatedNotes)
    })
  }

  function onRemoveNote(noteId) {
    keepService.get(noteId).then((note) => {

      if (note.isTrash) {
        keepService.remove(noteId).then(() => {
          const updatedNotes = notes.filter((note) => note.id !== noteId)
          setNotes(updatedNotes)
          //   showSuccessMsg(`Note removed!`)
        })
      } else {
        note.isTrash = true
        keepService.put(note)
        //   showSuccessMsg(`Note moved to Trash!`)
      }
    })
  }

  function onPinNote(noteId) {
    keepService.get(noteId).then((note) => {
      note.isPinned = note.isPinned ? false : true
      keepService.put(note)
    })
  }


  function onDuplicateNote(note) {
    console.log('onDuplicateNote: ', note);
    note.id = utilService.makeId()
    console.log("note from duplicate: ",note);
    onAddNewNote(note)
    // loadNotes()
  }

  function onOpenAddInbox() {
    setIsAddOpen(!isAddOpen)
    setIsAddboxShown(!isAddboxShown)
    setNewNote(keepService.getEmptyNote())
    if (isAddboxShown) {
      onAddNewNote(newNote)
    }
  }

  function onHandleTitleChange({ target }) {
    const val = target.value
    console.log(val);
    newNote.title = val
  }

  function onHandleTextChange({ target }) {
    const val = target.value
    console.log(val);
    newNote.info.txt = val
  }

  return (

    <section className="note-inedx app main-layout ">
      <KeepHeader />
      <main ref={boxRef} className="keep-content">
{/* <KeepMenu/> */}
        {isAddboxShown && <OpenAddInbox onOpenAddInbox={onOpenAddInbox} onHandleTitleChange={onHandleTitleChange} onHandleTextChange={onHandleTextChange} />}
        {isAddOpen && <AddInbox onOpenAddInbox={onOpenAddInbox} />}

        <NoteList pinnedNotes={pinnedNotes} unpinnedNotes={unpinnedNotes} onRemoveNote={onRemoveNote} onPinNote={onPinNote} notes={notes} onDuplicateNote={onDuplicateNote} />

      </main>
      {/* <UserMsg /> */}
      <KeepFooter />
    </section>

  )
}
