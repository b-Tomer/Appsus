
const { useEffect, useRef, useState } = React
const { useNavigate, useLocation } = ReactRouterDOM

export function KeepMenu({ onDarkMode, onToggleView, onTrashView }){
    
    return (

        <nav className="keep-menu">
            <button onClick={onTrashView} className="btn-menu"><i className="fa-regular fa-lightbulb"></i></button>
            <button onClick={onToggleView} className="btn-menu"><i className="fa-solid fa-list"></i></button>
          <button onClick={onDarkMode} className="btn-menu"><i className="fa-solid fa-circle-half-stroke"></i></button>
            <button onClick={onTrashView} className="btn-menu"><i className="fa-solid fa-trash-can"></i></button>
        </nav>
    )
 
}
