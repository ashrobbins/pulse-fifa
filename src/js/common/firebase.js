import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
    apiKey: "AIzaSyAESFkvet7BAhlhM4GwqsOPpP9uB860l7E",
    authDomain: "pulse-fifa.firebaseapp.com",
    databaseURL: "https://pulse-fifa-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pulse-fifa",
    storageBucket: "pulse-fifa.appspot.com",
    messagingSenderId: "629533493619",
    appId: "1:629533493619:web:13bd4e0bb029bab6a09d06"
};

const app = initializeApp( firebaseConfig );
export const db = getDatabase( app );
