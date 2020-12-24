import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCADADOx-1HOi2p0bcUZw6AzpM-dlbRQEo',
  authDomain: 'cleveroad-product.firebaseapp.com',
  projectId: 'cleveroad-product',
  storageBucket: 'cleveroad-product.appspot.com',
  messagingSenderId: '108201113662',
  appId: '1:108201113662:web:77d0a8085c8db477a8f96f',
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()
const database = firebase.database()

export { storage, database, firebase as default }
