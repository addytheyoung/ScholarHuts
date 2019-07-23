import React from 'react';
import * as firebase from 'firebase';
import gog from './googlelogo.png';
import face from './facebooklogo.png';
import './RenderModal.css';
import './App.css';


export default class RenderModalSignIn extends React.Component {
    googleSignIn() {
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

    facebookSignIn() {
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
    emailSignIn() {
        const auth = firebase.auth();
        const email = document.getElementById('4321').value;
        const pass = document.getElementById('54321').value;
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.then(() => {
            alert('Sign in successful!')
        })
        promise.catch(e => alert(e.message));

    }

    sendMessage(uid) {
        var modalProfile = document.getElementById("send-message-comp");

        modalProfile.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modalProfile) {
                modalProfile.style.display = "none";
            }
        }
    }


    render() {
        return (
            <div className="modal-screen">
                <div className="signup-buttons">

                    <button onClick={() => this.googleSignIn()} className="signup-button signup-google-button">
                        <img src={gog} className="google-logo" />
                        <div className="continue-with-google">Continue with Google</div>
                    </button>

                    <button onClick={() => this.facebookSignIn()} className="signup-button signup-facebook-button">
                        <img src={face} className="facebook-logo" />
                        <div className="continue-with-facebook">Continue with Facebook</div>
                    </button>
                    <h5>or</h5>

                    <div className="email-input-div">
                        <input type="email" placeholder="Email Address" id="4321"></input>
                    </div>
                    <div className="email-input-div">
                        <input type="password" placeholder="Password" id="54321"></input>
                    </div>


                    <div>
                        <input type="checkbox"></input> Remember me
                    </div>
                    <br></br>
                    <button onClick={() => this.emailSignIn()} className="signup-button signup-email-button">
                        <div className="continue-with-email">Log in</div>
                    </button>
                    <div>
                        <a href="/feedback" target="_blank">
                            Forgot password or username?
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}