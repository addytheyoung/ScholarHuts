import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import Header from './Header.js';
import RouterTest from './RouterTest.js';
import 'bootstrap/dist/css/bootstrap.css';

// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyDj1oAkYgHLLJ_GFevKQc53xjpoSS49bYo",
    authDomain: "utsubleaser.firebaseapp.com",
    databaseURL: "https://utsubleaser.firebaseio.com",
    projectId: "utsubleaser",
    storageBucket: "utsubleaser.appspot.com",
    messagingSenderId: "548610627809",
    appId: "1:548610627809:web:6a3a008981749e76"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase





firebase.auth().onAuthStateChanged(firebaseUser => {
    ReactDOM.render(<RouterTest />, document.getElementById('root'));

    if (firebaseUser) {
        if (firebaseUser.displayName == null) {
            firebaseUser.updateProfile({
                displayName: document.getElementById('first-name').value + ' ' + document.getElementById('last-name').value,
            })
        }
        localStorage.setItem("signedin", "true");
        if (localStorage.getItem("reloaded") == "false") {
            document.location.reload();
        }
        localStorage.setItem("reloaded", "true");

    } else {
        localStorage.setItem("signedin", "false");
        localStorage.setItem("reloaded", "false");
    }

});












// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
