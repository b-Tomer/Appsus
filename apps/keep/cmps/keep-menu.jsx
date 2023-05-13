
const { useRef } = React


export function KeepMenu({ onDarkMode, onToggleView, onTrashView }){
    
    const navStyle = {color:'red'}
    

    return (

        <nav style={navStyle} className="keep-menu">
            <button onClick={onTrashView} className="btn-menu"><i className="fa-regular fa-lightbulb"></i></button>
            <button onClick={onToggleView} className="btn-menu"><i className="fa-solid fa-list"></i></button>
          <button onClick={onDarkMode} className="btn-menu"><i className="fa-solid fa-circle-half-stroke"></i></button>
            <button onClick={onTrashView} className="btn-menu"><i className="fa-solid fa-trash-can"></i></button>
        </nav>
    )
 
}
