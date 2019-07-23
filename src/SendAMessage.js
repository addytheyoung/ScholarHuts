import React from 'react';
import * as firebase from 'firebase';
import './SendAMessage.css';
import Button from 'react-bootstrap/Button';

export default class SendAMessage extends React.Component {
    constructor(props) {
        super(props);
    }


    sendMessage() {
        const message = document.getElementById('send-message-to-user').value;

        const me = firebase.auth().currentUser.uid;
        const them = this.props.them;


        if (them === null) {
            return;
        }
        /* const dName = firebase.auth().currentUser.displayName;
        var firstName = '';
        for (var i = 0; i < dName.length; i++) {
            if (dName[i] == ' ') {
                firstName = dName.substring(0, i);
            }
        } */

        firebase.firestore().collection("messages").doc().set({
            message: message,
            sender: me,
            senderName: firebase.auth().currentUser.uid,
            reciever: them,
            unread: true,

        }).then(() => {
            document.getElementById('send-message-to-user').value = '';
            document.getElementById("send-message-comp").style.display = "none";
            alert('Success! Message sent.')
        }).catch(() => {
            alert('Failed. Please send again.')
        })
    }



    render() {
        if (firebase.auth().currentUser == null) {
            return (
                <div className="messages-box">
                    <h1>Sign in to send a message!</h1>
                </div>
            )
        } else {

            return (

                <div className="messages-box">
                    Send a Message to this poster!
                    (Directly to inbox. Please check your inbox for a reply.)
                    <br></br>
                    <textarea className="messages-box-input" id="send-message-to-user" />
                    <Button onClick={() => this.sendMessage()}>Send Message</Button>
                </div>

            )

        }
    }
}