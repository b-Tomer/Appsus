
export function ListInput({onHandleLiChange,onAddListItem}) {


    return (
        <div className="list-input">
            <i className="empty-box fa-regular fa-square"></i>
            <input className="list-item" type="text" onChange={onHandleLiChange} />
            <button onClick={onAddListItem} className="btn add-btn-list small"><i className="fa-solid fa-plus"></i></button>
        </div>
    )
}