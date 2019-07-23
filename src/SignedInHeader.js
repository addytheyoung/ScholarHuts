import React from 'react';
import RenderModal from './RenderModal.js';
import RenderModalSignIn from './RenderModalSignIn.js';
import logo from './Texas_Longhorns_logo.svg';
import * as firebase from 'firebase';
import MessagesModal from './MessagesModal.js';
import ProfileModal from './ProfileModal.js';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import App from './App.js';
import Header from './Header.js';
import RouterTest from './RouterTest.js';
import './SignedInHeader.css';
import Help from './Help.js';

export default class SignedInHeader extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            message: null,
            len: 0,
        }


        const arr = [];
        if (firebase.auth().currentUser != null) {

            const uid = firebase.auth().currentUser.uid;
            const q = firebase.firestore().collection("messages").where("reciever", "==", uid.toString()).get().then(docs => {


                docs.forEach(doc => {
                    var test = {
                        message: doc.data().message,
                        reciever: doc.data().reciever,
                        sender: doc.data().sender,
                        unread: doc.data().unread,
                        id: doc.id,
                    }
                    arr.push(test);

                })
                return arr;
            })
            q.then(w => {
                var len = 0;
                w.forEach(doc => {
                    if (doc.unread == true) {
                        len++;
                    }
                })

                this.setState({
                    message: w,
                    len: len,
                })
            })
        }
    }



    messagesButton() {

        var modalMsgs = document.getElementById("modal-messages");
        var modalProfile = document.getElementById("modal-myprofile");
        if (modalProfile.style.display != "none") {
            modalProfile.style.display = "none";
        }

        modalMsgs.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modalMsgs) {
                modalMsgs.style.display = "none";
            }
        }



        this.state.message.forEach(doc => {



            if (doc.unread == true) {
                firebase.firestore().collection("messages").doc('' + doc.id).set({
                    message: doc.message,
                    reciever: doc.reciever,
                    sender: doc.sender,
                    unread: false,
                })
            }
        })


        this.setState({
            len: 0,
        })
    }

    myProfileButton() {
        var modalProfile = document.getElementById("modal-myprofile");
        var modalMsgs = document.getElementById("modal-messages");
        if (modalMsgs.style.display != "none") {
            modalMsgs.style.display = "none";
        }
        modalProfile.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modalProfile) {
                modalProfile.style.display = "none";
            }
        }
    }
    bigBoi() {
        const id = document.getElementById('university-header');
        this.props.onChange2(id.value);
    }

    helpButton() {

        var modal = document.getElementById("modal-help");
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }





    render() {


        if (this.state.message == null) {
            return null;
        }


        return (
            <div className="header-banner">
                <div id="modal-messages" className="modal-messages">
                    <div className="modal-messages-content">
                        <MessagesModal
                            messages={this.state.message}
                        />

                    </div>
                </div>
                <div id="modal-myprofile" className="modal-myprofile">
                    <div className="modal-myprofile-content">
                        <ProfileModal />
                    </div>
                </div>
                <div id="modal-help" className="modal-myprofile">
                    <div className="modal-myprofile-content">
                        <Help />
                    </div>
                </div>





                <div className="div-logo">
                    <img src={logo} className="logo-img" />
                </div>
                <div className="search-bar">
                    <div className="city-university">
                        <div>
                            <label className="s">City   </label>
                            <select id="city-header" className="city">
                                <option> Austin</option>
                            </select>
                        </div>
                        <div>
                            <label className="s">University   </label>
                            <select id="university-header" className="university" onChange={() => this.bigBoi()}>
                                <option value="University of Texas at Austin">The University of Texas at Austin</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="search-bar">

                    <NavLink to="/apartments" activeClassName="app-sublet-button-active">
                        <button className="app-sublet-button">
                            Apartments
                        </button>
                    </NavLink>
                    <NavLink exact to="/sublets" activeClassName="app-sublet-button-active">
                        <button className="app-sublet-button" id="sublet-button-tab">
                            Sublets
                        </button>
                    </NavLink>

                </div>

                <div className="div-list">
                    <nav className="nav-list">
                        <ul className="ul-list">

                            <li style={{ width: "120px" }}>
                                <div className="div-button-sublease">

                                    <a href="gob">
                                        <button className="button-signup">
                                            Post a sublease
                                        </button>
                                    </a>



                                </div>

                            </li>
                            <li>
                                <div className="div-button-sublease2">
                                    <button className="button-signup" onClick={() => this.messagesButton()} id="msg-button">
                                        <div>
                                            Messages
                                        </div>
                                        <div>
                                            ({this.state.len})
                                        </div>
                                    </button>

                                </div>
                            </li>
                            <li style={{ width: "130px" }}>
                                <div className="div-button-sublease" style={{ width: "100px" }}>


                                    <button className="button-signup" style={{ width: "90px" }} onClick={() => this.helpButton()}>
                                        Feedback, <br /> Help
                                    </button>




                                </div>

                            </li>
                            <li>
                                <div className="div-button">
                                    <button className="button-signup" onClick={() => this.myProfileButton()} style={{ width: "50px", marginright: "100px;" }}>
                                        My profile
                                    </button>
                                </div>
                            </li>

                        </ul>
                    </nav>
                </div>

            </div>

        )
    }
}