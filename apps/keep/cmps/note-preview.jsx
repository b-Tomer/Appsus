const { useEffect, useState } = React


export function NotePreview({ note }) {
    const [cmpType, setCmpType] = useState('')


    return (
        <section>
            <DynamicCmp cmpType={cmpType} name="tomer" note={note} />
        </section>
    )
}


function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'txt':
            return <NoteTxt {...props} />
        case 'todos':
            return <NoteTodos {...props} />
        case 'img':
            return <NoteImg {...props} />
    }
}