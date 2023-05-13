import { Canvas } from "./canvas.jsx"

const {useEffect, useRef} = React

export function AddCanvas({onHandleTitleChange , onAddCanvasNote }) {
const titleRef = useRef()
useEffect(()=>{
    titleRef.current.focus()
},[])

function saveNoteToService(note) {
    fetch('https://example.com/save-note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then(response => {
        if (response.ok) {
          console.log('Note saved successfully');
        } else {
          console.error('Failed to save note');
        }
      })
      .catch(error => {
        console.error('Error saving note:', error);
      });
  }

  function handleSaveNote() {
    onSave();
  }

    return (
        <div className="open-add-box add-box">

            <form className="add-form">
                <input ref={titleRef} onChange={onHandleTitleChange} className="text-box title-input" type="text" placeholder="Title" />
                <button className="btn pin-btn"><img className="img-icon" src="assets/img/pinn.png" alt="" /></button>
                <Canvas onSaveNote={handleSaveNote} saveNoteToService={saveNoteToService}/>

                <button onClick={onAddCanvasNote} className="btn add-btn"><i className="fa-solid fa-plus"></i></button>
            </form>
        </div>

    )
}