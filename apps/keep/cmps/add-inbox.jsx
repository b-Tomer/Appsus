
export function AddInbox({onOpenAddInbox}){

    return(
        <div onClick={onOpenAddInbox} className="add-box"> <span> write somthing.. </span>
        <div className="add-btns">
          <button className="add-btn btn"><i className="fa-regular fa-square-check"></i></button>
          <button className="add-btn btn"><i className="fa-regular fa-image "></i></button>
          <button className="add-btn btn"><i className="fa-solid fa-paintbrush"></i></button>
        </div>
        </div>
    )
}
