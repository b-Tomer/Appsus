


const { useEffect, useState, useRef } = React


import { KeepHeader } from "../cmps/keep-header.jsx";
import { KeepFooter } from "../cmps/keep-footer.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import { keepService } from "../services/keep.service.js";
import { AddInbox } from "../cmps/add-inbox.jsx";
import { OpenAddInbox } from "../cmps/open-add-inbox.jsx";
import { utilService } from "../../../services/util.service.js";
import { KeepMenu } from "../cmps/keep-menu.jsx";
import { AddListItems } from "../cmps/add-list-items.jsx";
import { AddCanvas } from "../cmps/add-canvas.jsx";
import { TrashList } from "./trash-list.jsx";
import { EditNote } from "../cmps/edit-note.jsx";
import { showSuccessMsg } from "../../../services/event-bus.service.js";
import { eventBusService } from '../services/event-bus.service.js'
import { UserMsg } from "../../../cmps/user-msg.jsx";



export function KeepIndex() {

  const [notes, setNotes] = useState([])
  const [darkMode, setDarkMode] = useState(true)
  const [isCardsView, setIsCardsView] = useState(false)
  const [mainStyle, setMainStyle] = useState({})
  const [cardsStyle, setCardsStyle] = useState({})
  const [isShowTrash, setIsShowTrash] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(true)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isEditNote, setIsEditNote] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(null)
  const [isAddCanvas, setIsAddCanvas] = useState(false)
  const [isAddboxShown, setIsAddboxShown] = useState(false)
  const [isAddList, setIsAddList] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [searchBar, setSearchBar] = useState(keepService.getDefaultFilter())
  const pinnedNotes = notes.filter(note => note.isPinned && !note.isTrash);
  const unpinnedNotes = notes.filter(note => !note.isPinned && !note.isTrash);
  const trashNotes = notes.filter(note => note.isTrash);
  const boxRef = useRef()


  useEffect(() => {
    loadNotes()
  }, [newNote, notes]);

  useEffect(() => {
    const showUserMsgListener = eventBusService.on(
      'show-user-msg',
      (msg) => {
        console.log('Received show-user-msg event:', msg)
      }
    )
    return () => {
      showUserMsgListener()
    }
  }, [])

  function loadNotes() {
    keepService.query(searchBar).then(setNotes)
  }


  function onAddNewNote(newNote) {
    if (!newNote.info.txt && !newNote.info.title) {
      console.log('no title or txt');
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
          showSuccessMsg(`Note removed!`)
        })
      } else {
        note.isTrash = true
        keepService.put(note)
        showSuccessMsg(`Note moved to Trash!`)
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
    newNote.info.title = val
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

  function onTrashView() {
    setIsShowTrash(!isShowTrash)
  }

  // function onToggleMenu(){
  //   setIsOpenMenu(!isOpenMenu)

  // }

  function onEditNote(note) {
    console.log('edittttttttt');
    console.log('from onEditNote: ', note);
    setNoteToEdit(note)
    setIsEditNote(true)
  }

  function onSaveEdit(updatedNote) {
    console.log('saved edit: ', updatedNote);
    keepService.put(updatedNote)
      .then(() => {
        loadNotes()
      })
    setIsEditNote(false)
    setNoteToEdit(null)

  }

  function onCancelEdit() {
    console.log('cancel edit');
    setIsEditNote(false)
    setNoteToEdit(null)
  }

  function onPinNewNote() {
    newNote.isPinned = (!newNote.isPinned)
  }

  function onSetSearch(val) {
    setSearchBar(val)
  }



  return (

    <section style={mainStyle} className="note-inedx app main-layout ">
      <KeepHeader onSetSearch={onSetSearch} />

      <main ref={boxRef} className="keep-content">
        <KeepMenu onTrashView={onTrashView} onToggleView={onToggleView} onDarkMode={onDarkMode} />
        {isAddOpen && <AddInbox onOpenCanvs={onOpenCanvs} onOpenListInbox={onOpenListInbox} onOpenAddInbox={onOpenAddInbox} />}
        {isAddboxShown && <OpenAddInbox onPinNewNote={onPinNewNote} onOpenAddInbox={onOpenAddInbox} onHandleTitleChange={onHandleTitleChange} onHandleTextChange={onHandleTextChange} />}
        {isAddList && <AddListItems onAddListNote={onAddListNote} onHandleTitleChange={onHandleTitleChange} onOpenListInbox={onOpenListInbox} />}
        {isAddCanvas && <AddCanvas onAddCanvasNote={onAddCanvasNote} onHandleTitleChange={onHandleTitleChange} />}
        {!isShowTrash && <NoteList onEditNote={onEditNote} cardsStyle={cardsStyle} pinnedNotes={pinnedNotes} unpinnedNotes={unpinnedNotes} onRemoveNote={onRemoveNote} onPinNote={onPinNote} notes={notes} onDuplicateNote={onDuplicateNote} />}
        {isShowTrash && <TrashList trashNotes={trashNotes} cardsStyle={cardsStyle} pinnedNotes={pinnedNotes} unpinnedNotes={unpinnedNotes} onRemoveNote={onRemoveNote} onPinNote={onPinNote} notes={notes} onDuplicateNote={onDuplicateNote} />}
        {isEditNote && <EditNote note={noteToEdit} onSaveEdit={onSaveEdit} onCancelEdit={onCancelEdit} />}
      </main>
      <UserMsg />
      <KeepFooter />
    </section>

  )
}
