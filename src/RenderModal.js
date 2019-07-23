import React from 'react';
import * as firebase from 'firebase';
import './RenderModal.css';
import gog from './googlelogo.png';
import face from './facebooklogo.png';


export default class RenderModal extends React.Component {



    googleSignUp() {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            alert(result)
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;


            // ...
        }).catch(function (error) {
            alert(error.message)
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    facebookSignUp() {

        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            alert(result)
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            alert(error.message)
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    emailSignUp() {
        const auth = firebase.auth();
        const email = document.getElementById('1234').value;
        const pass = document.getElementById('12345').value;
        const first = document.getElementById('first-name').value;
        const last = document.getElementById('last-name').value;



        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.then(() => {
            alert('Sign up successful!')
        })
        promise.catch(e => alert(e.message));

    }




    render() {

        return (
            <div className="modal-screen">
                <div className="signup-buttons">
                    <button onClick={() => this.googleSignUp()} className="signup-button signup-google-button">
                        <img src={gog} className="google-logo" />
                        <div className="continue-with-google">Continue with Google</div>
                    </button>

                    <button onClick={() => this.facebookSignUp()} className="signup-button signup-facebook-button">
                        <img src={face} className="facebook-logo" />
                        <div className="continue-with-facebook">Continue with Facebook</div>
                    </button>
                    <h5>or</h5>
                    <div className="email-input-div">
                        <input type="name" placeholder="First Name" id="first-name"></input>
                    </div>
                    <div className="email-input-div">
                        <input type="name" placeholder="Last Name" id="last-name"></input>
                    </div>

                    <div className="email-input-div">
                        <input type="email" placeholder="Email Address" id="1234"></input>
                    </div>
                    <div className="email-input-div">
                        <input type="password" placeholder="Password" id="12345"></input>
                    </div>
                    <button onClick={() => this.emailSignUp()} className="signup-button signup-email-button" type="submit">
                        <div className="continue-with-email">Sign up</div>
                    </button>

                </div>
            </div>
        )
    }
}