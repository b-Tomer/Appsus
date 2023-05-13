


export function Modal({ currWatcher, isClosed, setClosed }) {
    const closedClass = isClosed ? '' : 'hide'
    function onCloseModal() {
        setClosed(false)
    }

    return (
        <div className={`card modal ${closedClass}`}>
            <button onClick={() => onCloseModal()}>X</button>
            <h1>Name: {currWatcher.name}</h1>
            <h3>ID: {currWatcher.id}</h3>
            <h3>Movies: {currWatcher.movies}</h3>
        </div>
    )
}