import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMelQBjFk2bVMNZpBekvKOK__xfDNSyD8",
    authDomain: "whatsapp-clone-e6d30.firebaseapp.com",
    projectId: "whatsapp-clone-e6d30",
    storageBucket: "whatsapp-clone-e6d30.appspot.com",
    messagingSenderId: "4661412154",
    appId: "1:4661412154:web:bb731c599d8186fd02d003",
    measurementId: "G-D416PQ1KV3"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;