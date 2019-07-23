import React from 'react';
import * as firebase from 'firebase'
import logo from './logo.svg';
import './Inbox.css';
import SendAMessage from './SendAMessage.js';



export default class Inbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            sender: null,
        }

        if (firebase.auth().currentUser != null) {
            const arr = [];
            const uid = firebase.auth().currentUser.uid;
            const q = firebase.firestore().collection("messages").where("reciever", "==", uid.toString()).get().then(docs => {
                docs.forEach(doc => {
                    arr.push(doc.data());
                })
                return arr;
            })
            q.then(w => {

                this.setState({
                    message: w,
                })
            })
        }
    }

    replyMessage(sender) {

        var modalProfile = document.getElementById("send-message-comp");
        modalProfile.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modalProfile) {
                modalProfile.style.display = "none";
            }
        }
        this.setState({
            sender: sender,
        })

    }









    render() {
        if (this.state.message == null) {
            return null;
        } else {


            const temp = this.state.message.map(ele => {


                return (
                    <div className="ind-message-box">
                        <div style={{ fontSize: "10px" }}>
                            From: {ele.senderName}
                        </div>
                        <div>
                            {ele.message}
                        </div>
                        <div>
                            <button onClick={() => this.replyMessage(ele.sender)}>Reply</button>
                        </div>


                    </div>
                )
            })
            return (
                <body>
                    <div className="send-message-comp" id="send-message-comp">
                        <div className="send-message-content">

                            <SendAMessage
                                them={this.state.sender}
                            />
                        </div>
                    </div>

                    <div className="inbox-all">
                        <div className="inbox-banner">
                            <div class="div-logo">
                                <a href="/sublets">
                                    <img src={logo} class="logo-img" id="zzzzz" />
                                </a>
                            </div>
                            <div class="div-step">
                                Inbox
                            </div>
                        </div>
                        <div className="inbox-body">
                            <div className="num-messages">
                                You have {this.state.message.length} messages!
                            </div>
                            <div className="messages-outer-box">
                                {temp}
                            </div>

                        </div>

                    </div>
                </body>

            )
        }






    }

}