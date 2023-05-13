// keep service


import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'


const KEEP_KEY = 'keepDB'


const gNotes = [
    {
        id: utilService.makeId(),
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: ''
        },
        info: {
            title: 'My Bank-acount password',
            txt: 's321frr!'
        }
    },
    {
        id: utilService.makeId(),
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: ''
        },
        info: {
            title: 'מאמרים לקרוא:',
            txt: '\nהיצירה לב הטיפול\nבתוך גבולות המסגרת\nתיאורי מקרה'
        }
    },
    {
        id: utilService.makeId(),
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: ''
        },
        info: {
            title: 'שם מעבר לפסנתר',
            txt: 'שם מעבר לפסנתר עישנה סיגריות בשרשרת בין שאיפה לשאיפה היא שרה הצטרפתי עם גיטרה. שם רחוק על הערסל בקצה החוף היא מתנדנדת'
        }
    },

    {
        id: utilService.makeId(),
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#B4FF9F'
        },
        info: {
            title: 'banana pie recepie',
            txt: '2 bananas ,1/2 flower , 1 egg , 1/2 glass sugar ...'
        }
    },
    {
        id: utilService.makeId(),
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        isTrash: true,
        style: {
            backgroundColor: '#FFD59E'
        },
        info: {
            title: 'ביטוח לאומי',
            txt: '04-8511436'
        }
    },
    {
        id: utilService.makeId(),
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        isTrash: true,
        style: {
            backgroundColor: ''
        },
        info: {
            title: 'Bohemian Rhapsody',
            txt: 'Is this the real life? Is this just fantasy? Caught in a landside,No escape from reality Open your eyes, Look up to the skies and see,'
        }
    },

    {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my shit together',
            todos: [
                { txt: 'Style the app', id: utilService.makeId(), doneAt: null },
                { txt: 'Go to see a waterfall', id: utilService.makeId(), doneAt: 187111111 },
                { txt: 'Go to the gym', id: utilService.makeId(), doneAt: null }
            ]
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyL5cIeywWrjdsTywCSa_cyT5XqphMQXWL3g&usqp=CAU',
            title: 'Eyal and Me'
        },
        style: {
            backgroundColor: '#FFA1A1'
        }
    },
    {
        id: utilService.makeId(),
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#F9FFA4'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteVideo',
        isPinned: true,
        info: {
            url: 'https://www.youtube.com/embed/DtJzr1Wcy_s',
            title: 'Nina Simon'
        },
        style: {
            backgroundColor: '#f7f6f67e'
        }
    },

    {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: true,
        info: {
            title: 'Shoping list:',
            todos: [
                { txt: 'גמבות לדג', id: utilService.makeId(), doneAt: null },
                { txt: 'פלפל חריף', id: utilService.makeId(), doneAt: 187121111 }
            ]
        },
        style: {
            backgroundColor: '#FFD59E'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: true,
        isTrash: true,
        info: {
            title: 'Shoping list:',
            todos: [
                { txt: 'milk', id: utilService.makeId(), doneAt: null },
                { txt: 'eggs', id: utilService.makeId(), doneAt: 187121111 },
                { txt: 'bread', id: utilService.makeId(), doneAt: 187121111 }
            ]
        },
        style: {
            backgroundColor: '#F9FFA4'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: true,
        isTrash: true,
        info: {
            url: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyLGxhbmRzY2FwZXx8fHx8fDE2ODM4MjAxMTY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920',
            title: 'My trip'
        },
        style: {
            backgroundColor: '#f7f6f67e'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: true,
        info: {
            url: 'https://images.unsplash.com/photo-1683220367836-f421ee46c013?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
            title: 'Chile'
        },
        style: {
            backgroundColor: '#f7f6f67e'
        }
    },

    {
        id: utilService.makeId(),
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: false,
        isTrash: true,
        style: {
            backgroundColor: '#f7f6f67e'
        },
        info: {
            title: 'חנות בשר',
            txt: 'רחוב קדש 10 , אשדוד'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteVideo',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/embed/GnO7AEX3tJY',
            title: 'Gaza'
        },
        style: {
            backgroundColor: '#f7f6f67e'
        }
    },


]


_createNotes()
// import {utilService} from ""

export const keepService = {
    query,
    get,
    put,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,

}

function query(filterBy = '') {
    return asyncStorageService.query(KEEP_KEY)
        .then(notes => {
            if (filterBy === '') return notes
            const regExp = new RegExp(filterBy, 'i')
            notes = notes.filter(note => regExp.test(note.info.title))
            return notes
        })
}

function get(noteId) {
    return asyncStorageService.get(KEEP_KEY, noteId)
    // return axios.get(KEEP_KEY, noteId)
}

function put(updatedNote) {
    return asyncStorageService.put(KEEP_KEY, updatedNote)
    // return axios.get(KEEP_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(KEEP_KEY, noteId)
}

function save(note) {
    return asyncStorageService.post(KEEP_KEY, note)
}


function getEmptyNote(type = 'NoteTxt') {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type: type,
        isPinned: false,
        style: {
            backgroundColor: ''
        },
        info: {
            title: '',
            txt: ''
        }
    }

}


function getDefaultFilter() {
    return ''
}

function _createNotes() {
    let notes = storageService.loadFromStorage(KEEP_KEY)
    if (!notes || !notes.length) {
        notes = gNotes
        storageService.saveToStorage(KEEP_KEY, notes)
    }
    //   console.log('notes: ', notes )
}




