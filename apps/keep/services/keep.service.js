// keep service


import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const KEEP_KEY = 'keepDB'


const gNotes = [
    {
    id: 'n101',
    createdAt: 1112222,
    type: 'NoteTxt',
    isPinned: true,
    style: {
    backgroundColor: '#00d'
    },
    info: {
    txt: 'Fullstack Me Baby!'
    }
    },
    {
    id: 'n102',
    type: 'NoteImg',
    isPinned: false,
    info: {
    url: 'http://some-img/me',
    title: 'Bobi and Me'
    },
    style: {
    backgroundColor: '#00d'
    }
    },
    {
    id: 'n103',
    type: 'NoteTodos',
    isPinned: false,
    info: {
    title: 'Get my stuff together',
    todos: [
    { txt: 'Driving license', doneAt: null },
    { txt: 'Coding power', doneAt: 187111111 }
    ]
    }
    }
    ]

   
_createNotes()
// import {utilService} from ""

export const keepService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
  getDefaultFilter,

}

function query(/*filterBy = {}*/) {
  // console.log('filterBy service:', filterBy)
  return storageService.query(KEEP_KEY)
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
  return storageService.get(KEEP_KEY, noteId)
  // return axios.get(KEEP_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(KEEP_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(KEEP_KEY, note)
  } else {
    return storageService.post(KEEP_KEY, note)
  }
}

function getEmptyNote(title, txt) {
    return {
        id: utilService.makeId(),
        title: title,
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: true,
        style: {
        backgroundColor: '#00d'
        },
        info: {
        txt: txt
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




