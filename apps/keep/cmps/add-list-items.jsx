import { utilService } from "../../../services/util.service.js"
import { keepService } from "../services/keep.service.js"
import { ListInput } from "./list-input.jsx"

const { useEffect, useRef, useState } = React

export function AddListItems({onHandleTitleChange,onHandleLiChange,onAddListNote}) {

    const[list, setList] =useState([<ListInput key={utilService.makeId()} onAddListItem={onAddListItem} onHandleLiChange={onHandleLiChange}/>])
    const[listData, setListData] = useState([])
    const titleRef = useRef()

    useEffect(() => {
        titleRef.current.focus()
    }, [])

    function onHandleLiChange({ target }) {
        const val = target.value
        console.log(val);
    
      }

    function onAddListItem(){
        list.push(<ListInput key={utilService.makeId()} onAddListItem={onAddListItem} onHandleLiChange={onHandleLiChange}/>)
        console.log('add list item');
       const items = list.map(item => keepService.getEmptyNote('NoteTodos'))
        console.log(items);
        setListData(items)
        console.log(listData);


    }

// console.log(list);
    return (
        <div className="open-add-box add-box">

            <form className="list-form">
                <button className="btn pin-btn"><img className="img-icon" src="assets/img/pinn.png" alt="" /></button>
                <input ref={titleRef} onChange={onHandleTitleChange} className="text-box title-input" type="text" placeholder="Title" />
                {list.map(list => list)}
               
            </form>
                <button onClick={onAddListNote} className="btn add-btn"><i className="fa-solid fa-plus"></i></button>
        </div>

    )
}