import { NoteTodos } from "./apps/keep/cmps/note-todos.jsx";
import { NoteTxt } from "./apps/keep/cmps/note-txt.jsx";
import { NoteImg } from "./apps/keep/cmps/note-img.jsx";
import { OptionsBtns } from "./apps/keep/cmps/options-btns.jsx";
import { NoteVideo } from "./apps/keep/cmps/note-video.jsx";

const { useEffect, useState } = React

export function NotePreview({ note, onRemoveNote, onPinNote, onDuplicateNote, onEditNote }) {
    const [cmpType, setCmpType] = useState('')
    const [cardStyle, setCardStyle] = useState({
        backgroundColor: '',
    })

    useEffect(() => {
        setCmpType(note.type)
    }, [])


    function onSetCardStyle(newStyle) {
        setCardStyle((prevStyle) => ({ ...prevStyle, ...newStyle }))
    }


    return (
        <div className="card-container">
            <DynamicCmp cmpType={cmpType} name="tomer" note={note} cardStyle={cardStyle} onEditNote={onEditNote} />
            <OptionsBtns onPinNote={onPinNote} onDuplicateNote={onDuplicateNote} onSetCardStyle={onSetCardStyle} onRemoveNote={onRemoveNote} note={note} />
        </div>
    )
}


function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteVideo':
            return <NoteVideo {...props} />
    }
}