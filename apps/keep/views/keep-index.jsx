

const { Link, NavLink, Route, Routes } = ReactRouterDOM
const { useEffect, useState } = React


import { KeepHeader } from "../cmps/keep-header.jsx";
import { UserMsg } from "../cmps/user-msg.jsx";
import { KeepFooter } from "../cmps/keep-footer.jsx";
import { NoteList } from "../cmps/note-list.jsx";
import { keepService } from "../services/keep.service.js";



export function KeepIndex() {

  const [notes, setNotes] = useState([])

  // const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  //
  useEffect(() => {
    loadNotes()
    // showSuccessMsg('Welcome to the Keeper!')
  }, []);

  function loadNotes() {
    keepService.query().then((notes) => setNotes(notes))
  }



  {console.log(notes);}
  return (

    <section className="note-inedx app main-layout ">
      <KeepHeader />
      <main>

        <NoteList notes={notes} />

      </main>
      {/* <UserMsg /> */}
      <KeepFooter />
    </section>


  )
}
