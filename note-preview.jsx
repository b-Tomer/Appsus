import { NoteTodos } from "./apps/keep/cmps/note-todos.jsx";
import { NoteTxt } from "./apps/keep/cmps/note-txt.jsx";
import { NoteImg } from "./apps/keep/cmps/notw-img.jsx";

const { useEffect, useState } = React


export function NotePreview({ note }) {
    const [cmpType, setCmpType] = useState('')
useEffect(()=>{
        setCmpType(note.type)  
        console.log(note.type); 
    },[])

    return (
        <section>
            <DynamicCmp cmpType={cmpType} name="tomer" note={note} />
        </section>
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