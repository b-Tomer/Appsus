

const { Link, NavLink, Route, Routes } = ReactRouterDOM
const { useEffect, useState, useRef } = React


import { KeepHeader } from "../cmps/keep-header.jsx";
import { UserMsg } from "../cmps/user-msg.jsx";
import { KeepFooter } from "../cmps/keep-footer.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import { keepService } from "../services/keep.service.js";
import { AddInbox } from "../cmps/add-inbox.jsx";
import { OpenAddInbox } from "../cmps/open-add-inbox.jsx";
import { utilService } from "../../../services/util.service.js";
import { KeepMenu } from "../cmps/keep-menu.jsx";
import { AddListItems } from "../cmps/add-list-items.jsx";
import { AddCanvas } from "../cmps/add-canvas.jsx";



export function KeepIndex() {

  const [notes, setNotes] = useState([])
  const [darkMode, setDarkMode] = useState(true)
  const [isCardsView, setIsCardsView] = useState(true)
  const [mainStyle, setMainStyle] = useState({})
  const [cardsStyle, setCardsStyle] = useState({})
  const [isAddOpen, setIsAddOpen] = useState(true)
  const [isAddCanvas, setIsAddCanvas] = useState(false)
  const [isAddboxShown, setIsAddboxShown] = useState(false)
  const [isAddList, setIsAddList] = useState(false)
  const [newNote, setNewNote] = useState('')
  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);
  const boxRef = useRef()
  // const [filterBy, setFilterBy] = useState(keepService.getDefaultFilter())
  //


  useEffect(() => {
    loadNotes()
  }, [newNote, notes]);

  function loadNotes() {
    keepService.query().then(setNotes)
  }


  function onAddNewNote(newNote) {
    if (!newNote.title && !newNote.info.txt && !newNote.info.title) {
      console.log('no title');
      return
    }
    keepService.save(newNote).then((note) => {
      notes.push(note)
      const updatedNotes = notes
      console.log('from addNewNote: ', updatedNotes);
      setNotes(updatedNotes)
    })
  }

  function onDuplicateNote(note) {
    console.log('onDuplicateNote: ', note);
    const copyNote = JSON.parse(JSON.stringify(note));
    copyNote.id = utilService.makeId()
    setTimeout(() => {

      console.log("note from duplicate: ", copyNote);
      onAddNewNote(copyNote)

    }, 2000)
    // loadNotes()
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



  function onOpenAddInbox() {
    setIsAddOpen(!isAddOpen)
    setIsAddboxShown(!isAddboxShown)
    setNewNote(keepService.getEmptyNote())
    if (isAddboxShown) {
      onAddNewNote(newNote)
    }
  }

  function onOpenListInbox() {
    setIsAddOpen(false)
    setIsAddboxShown(false)
    setIsAddList(true)
  }

  function onOpenCanvs() {
    setIsAddOpen(false)
    setIsAddboxShown(false)
    setIsAddList(false)
    setIsAddCanvas(true)
  }

  function onHandleTitleChange({ target }) {
    const val = target.value
    console.log(val);
    if(newNote.title == '') newNote.info.title = val
    else newNote.title = val
  }

  function onHandleTextChange({ target }) {
    const val = target.value
    console.log(val);
    newNote.info.txt = val
  }


  function onDarkMode() {
    setDarkMode(!darkMode)
    console.log(darkMode);
    if (darkMode) {
      setMainStyle({ backgroundColor: '#c0c0c0', color: 'white' })
    } else setMainStyle({})
  }

  function onToggleView() {
    setIsCardsView(!isCardsView)
    console.log(isCardsView);
    if (!isCardsView) {
      setCardsStyle({ columnCount: 1 })
    } else setCardsStyle({})
  }

  function onAddListNote() {
    setIsAddList(false)
    setIsAddOpen(true)
    console.log('added list note');
  }

  function onAddCanvasNote() {
    console.log('canvass added');
    setIsAddOpen(true)
    setIsAddCanvas(false)
  }

  


  return (

    <section style={mainStyle} className="note-inedx app main-layout ">
      <KeepHeader onToggleView={onToggleView} onDarkMode={onDarkMode} />

      <main ref={boxRef} className="keep-content">
        {/* <KeepMenu/> */}
        {isAddOpen && <AddInbox onOpenCanvs={onOpenCanvs} onOpenListInbox={onOpenListInbox} onOpenAddInbox={onOpenAddInbox} />}
        {isAddboxShown && <OpenAddInbox onOpenAddInbox={onOpenAddInbox} onHandleTitleChange={onHandleTitleChange} onHandleTextChange={onHandleTextChange} />}
        {isAddList && <AddListItems onAddListNote={onAddListNote} onHandleTitleChange={onHandleTitleChange} onOpenListInbox={onOpenListInbox} />}
        {isAddCanvas && <AddCanvas onAddCanvasNote={onAddCanvasNote} onHandleTitleChange={onHandleTitleChange} />}
        <NoteList cardsStyle={cardsStyle} pinnedNotes={pinnedNotes} unpinnedNotes={unpinnedNotes} onRemoveNote={onRemoveNote} onPinNote={onPinNote} notes={notes} onDuplicateNote={onDuplicateNote} />

      </main>
      {/* <UserMsg /> */}
      <KeepFooter />
    </section>

  )
}
