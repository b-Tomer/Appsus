import { ColorInput } from "./colot-input.jsx"

const { useEffect, useState } = React


export function OptionsBtns({ onRemoveNote, onPinNote, note , onSetCardStyle ,onDuplicateNote}) {

  const [isChangeColor, setIsChangeColor] = useState(false)


    function onChooseColor(color) {
        const newStyle= { backgroundColor: color }
        onSetCardStyle(newStyle)
    }


    return (

        <section className=" options-container">
            {isChangeColor &&  <ColorInput onSetCardStyle={onSetCardStyle}/>}
            <button onClick={()=>onDuplicateNote(note)} className="btn options-btn"><i className="fa-regular fa-copy"></i></button>
            <button onClick={() => onPinNote(note.id)} className="btn options-btn"><i className="fa-solid fa-thumbtack"></i></button>
            <button className="btn options-btn"><i className="fa-solid fa-envelope"></i></button>
            <button onClick={()=> setIsChangeColor(!isChangeColor)} className="btn options-btn"><i className="fa-solid fa-palette"></i></button>
            <button onClick={() => onRemoveNote(note.id)} className="btn options-btn"><i className="fa-solid fa-trash-can"></i></button>
        </section>
    )
}