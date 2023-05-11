const {useEffect, useRef} = React

export function OpenAddInbox({ onHandleTextChange, onOpenAddInbox, onHandleTitleChange }) {
const titleRef = useRef()
useEffect(()=>{
    titleRef.current.focus()
},[])




    return (
        <div className="open-add-box add-box">

            <form className="add-form">
                <input ref={titleRef} onChange={onHandleTitleChange} className="text-box title-input" type="text" placeholder="Title" />
                <button className="btn pin-btn"><img className="img-icon" src="assets/img/pinn.png" alt="" /></button>
                <textarea className="text-box" itemID="add-box" onChange={onHandleTextChange} name="" id="" cols="30" rows="10" placeholder="Write something.."></textarea>
                <button onClick={onOpenAddInbox} className="btn add-btn"><i className="fa-solid fa-plus"></i></button>
            </form>
        </div>

    )
}