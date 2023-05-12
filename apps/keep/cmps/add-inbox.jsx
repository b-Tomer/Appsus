
export function AddInbox({onOpenAddInbox,onOpenListInbox,onOpenCanvs}){

    return(
        <div className="add-box"> <span onClick={onOpenAddInbox} className="write-span"> write somthing.. </span>
        <div className="add-btns">
          <button onClick={onOpenListInbox} className="add-btn btn"><i className="fa-regular fa-square-check"></i></button>
          <button className="add-btn btn"><i className="fa-regular fa-image "></i></button>
          <button onClick={onOpenCanvs} className="add-btn btn"><i className="fa-solid fa-paintbrush"></i></button>
        </div>
        </div>
    )
}
