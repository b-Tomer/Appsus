

export function OpenAddInbox({ onHandleChange, onOpenAddInbox }) {

    return (
        <div className="open-add-box add-box">

            <form className="add-form">
                <input className="text-box title-input" type="text" placeholder="Title" />
                <button className="btn pin-btn"><img className="img-icon" src="assets/img/pinn.png" alt="" /></button>
                <textarea className="text-box" itemID="add-box" onChange={onHandleChange} name="" id="" cols="30" rows="10" placeholder="Write something.."></textarea>
                <button onClick={onOpenAddInbox} className="btn add-btn">➕</button>
            </form>
        </div>

    )
}