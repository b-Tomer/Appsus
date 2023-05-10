import { NoteTodos } from "./apps/keep/cmps/note-todos.jsx";
import { NoteTxt } from "./apps/keep/cmps/note-txt.jsx";
import { NoteImg } from "./apps/keep/cmps/note-img.jsx";
import { OptionsBtns } from "./apps/keep/cmps/options-btns.jsx";

const { useEffect, useState } = React


export function NotePreview({ note, onRemoveNote, onPinNote }) {
    const [cmpType, setCmpType] = useState('')
    useEffect(() => {
        setCmpType(note.type)
        // console.log(note.type);
    }, [])
// console.log(onRemoveNote);
    return (
        <div>
            <DynamicCmp cmpType={cmpType} name="tomer" note={note} />
            <OptionsBtns onPinNote={onPinNote} onRemoveNote={onRemoveNote} note={note} />
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
    }
}