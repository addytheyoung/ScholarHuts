import React from 'react';
import RenderModal from './RenderModal.js';
import RenderModalSignIn from './RenderModalSignIn.js';
import logo from './Texas_Longhorns_logo.svg';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import Help from './Help.js';


export default class SignedOutHeader extends React.Component {

    signUpPopup() {
        var modal = document.getElementById("myModal");
        var modalSignin = document.getElementById("myModal-signin");
        if (modalSignin.style.display != "none") {
            modalSignin.style.display = "none";
        }
        // Get the button that opens the modal
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    logInPopup() {
        var modalSignin = document.getElementById("myModal-signin");
        var modal = document.getElementById("myModal");
        if (modal.style.display != "none") {
            modal.style.display = "none";
        }
        // Get the button that opens the modal
        // Get the <span> element that closes the modal
        var spanSignin = document.getElementsByClassName("close-signin")[0];
        modalSignin.style.display = "block";
        spanSignin.onclick = function () {
            modalSignin.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target == modalSignin) {
                modalSignin.style.display = "none";
            }
        }
    }

    helpPopup() {
        var modal = document.getElementById("modal-help");
        modal.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }

    render() {
        return (
            <div className="header-banner">
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close">X</span>
                        <RenderModal />
                    </div>
                </div>
                <div id="myModal-signin" className="modal-signin">
                    <div className="modal-content-signin">
                        <span className="close-signin">X</span>
                        <RenderModalSignIn />
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
                            <li style={{ width: "100px" }}>
                                <div className="div-button-sublease">

                                    <button className="button-signup" onClick={() => this.signUpPopup()}>
                                        Post a sublease
                                        </button>
                                </div>
                            </li>
                            <li style={{ width: "110px" }}>
                                <div className="div-button-sublease">


                                    <button className="button-signup" onClick={() => this.helpPopup()}>
                                        Feedback, <br /> Help
                                        </button>




                                </div>

                            </li>
                            <li>
                                <div className="div-button">
                                    <button className="button-signup" onClick={() => this.signUpPopup()}>
                                        Sign up
                                    </button>
                                </div>
                            </li>
                            <li>
                                <div className="div-button">
                                    <button className="button-login" onClick={() => this.logInPopup()}>
                                        Log In
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