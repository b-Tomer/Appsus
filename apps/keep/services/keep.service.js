// keep service


import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'


const KEEP_KEY = 'keepDB'


const gNotes = [

    {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my shit together',
            todos: [
                { txt: 'Style the app', id: utilService.makeId() , doneAt: null },
                { txt: 'Go to see a waterfall', id: utilService.makeId() , doneAt: 187111111 },
                { txt: 'Go to the gym', id: utilService.makeId() , doneAt: null }
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
            backgroundColor: ''
        }
    },

    {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: true,
        info: {
            title: 'Shoping list:',
            todos: [
                { txt: 'גמבות לדג', id: utilService.makeId() , doneAt: null },
                { txt: 'פלפל חריף', id: utilService.makeId() , doneAt: 187121111 }
            ]
        },
        style: {
            backgroundColor: '#FFD59E'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: true,
        info: {
            url: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=1080&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyLGxhbmRzY2FwZXx8fHx8fDE2ODM4MjAxMTY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1920',
            title: 'Nice view'
        },
        style: {
            backgroundColor: ''
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
            backgroundColor: ''
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

function query(/*filterBy = {}*/) {
    // console.log('filterBy service:', filterBy)
    return asyncStorageService.query(KEEP_KEY)
        .then(notes => {
            //   if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     notes = notes.filter(note => regExp.test(note.title))
            //   }

            //   if (filterBy.maxPrice) {
            //     notes = notes.filter(note => note.listPrice.amount <= filterBy.maxPrice)
            //   }

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
    console.log('note.id: ', note.id )
    // if (note.id) {
    //     return asyncStorageService.put(KEEP_KEY, note)
    // } else {
       
        console.log('note from saved: ', note )
        return asyncStorageService.post(KEEP_KEY, note)
    // }
}

function getEmptyNote() {
    return {
        id: utilService.makeId(),
        title: '',
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: ''
        }
    }

}


function getDefaultFilter() {
    return { name: '', maxPrice: '' }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(KEEP_KEY)
    if (!notes || !notes.length) {
        notes = gNotes
        storageService.saveToStorage(KEEP_KEY, notes)
    }
    //   console.log('notes: ', notes )
}




