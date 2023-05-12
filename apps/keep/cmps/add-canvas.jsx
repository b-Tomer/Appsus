import { Canvas } from "./canvas.jsx"

const {useEffect, useRef} = React

export function AddCanvas({onHandleTitleChange , onAddCanvasNote }) {
const titleRef = useRef()
useEffect(()=>{
    titleRef.current.focus()
},[])




    return (
        <div className="open-add-box add-box">

            <form className="add-form">
                <input ref={titleRef} onChange={onHandleTitleChange} className="text-box title-input" type="text" placeholder="Title" />
                <button className="btn pin-btn"><img className="img-icon" src="assets/img/pinn.png" alt="" /></button>
                <Canvas/>
                
                <button onClick={onAddCanvasNote} className="btn add-btn"><i className="fa-solid fa-plus"></i></button>
            </form>
        </div>

    )
}