import React from 'react';
import * as firebase from 'firebase';
import BigImageWheel from './BigImageWheel.js';
import './UniqueApartment.css';
import logo from './Texas_Longhorns_logo.svg';
import { classBody, bindExpression } from '@babel/types';
import SendAMessage from './SendAMessage.js';
import ImageWheel from './ImageWheel.js';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';



export default class UniqueApartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            asdf: null,
        }

        const url = window.location.pathname.substring(6, window.location.pathname.length);
        const db = firebase.firestore();

        db.collection('Austin').doc('University of Texas at Austin').collection('Sublets').doc(url.toString()).get().then((ref) => {

            this.setState(() => {
                return {
                    asdf: ref.data(),

                }
            })
        })
    }

    openMessages() {
        var modalProfile = document.getElementById("send-message-comp");

        modalProfile.style.display = "block";
        window.onclick = function (event) {
            if (event.target == modalProfile) {
                modalProfile.style.display = "none";
            }
        }
    }




    render() {

        if (this.state.asdf == null) {
            return <Spinner animation="border" role="status" style={{
                marginLeft: "48vw",
                marginTop: "30vh",
            }
            }>
                <span className="sr-only">Loading...</span>
            </Spinner >;
        } else {
            const box = this.state.asdf;
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var gender = box.gender;
            if (box.numBeds[0] == 1 && box.numBath[0] == 1) {
                gender = "Either (Single room)";
            }
            const sYear = box.startDate.substring(0, 4);
            var sMonth = parseInt(box.startDate.substring(5, 7));
            sMonth = monthNames[sMonth - 1];
            const sDay = box.startDate.substring(8, 10);


            const eYear = box.endDate.substring(0, 4);
            var eMonth = parseInt(box.endDate.substring(5, 7));
            eMonth = monthNames[eMonth - 1];
            const eDay = box.endDate.substring(8, 10);




            return (
                <div class="root">
                    <div class="header-banner">
                        <div class="div-logo">
                            <a href="/sublets">
                                <img src={logo} class="logo-img" id="zzzzz" />
                            </a>

                        </div>

                        <div className="div-step">
                            <h3>Apartment {box.uniqueId}</h3>
                        </div>


                    </div>
                    <br /> <br /> <br /> <br />
                    <div className="big-wheel">
                        <ImageWheel
                            images={box.imgURLS}
                            uniqueId={box.uniqueId}
                        />
                    </div>
                    <br /> <br />
                    <div className="send-message-comp" id="send-message-comp">
                        <div className="send-message-content">
                            <SendAMessage
                                them={box.uid}
                            />
                        </div>
                    </div>
                    <div className="parent-unique-body">

                        <div className="unique-body">
                            <div>
                                <div>
                                    <h4>Title</h4>
                                </div>
                                <div className="move-in-out">
                                    Apartment: <h4>{box.name}</h4>
                                </div>
                                <div className="move-in-out">
                                    Address: <h4>{box.address}</h4>
                                </div>
                                <div className="move-in-out">
                                    Cost: <h4>${box.charge}/month</h4>
                                </div>
                                <div className="move-in-out">
                                    Apartment Size: <h4>{box.numBeds} x {box.numBath}</h4>
                                </div>
                                <div className="move-in-out">
                                    <div className="move-date">
                                        Earliest Move In: <h4 className="exception">{sMonth} {sDay}, {sYear}</h4>
                                    </div>
                                    <div className="move-date">
                                        Latest Move Out: <h4 className="exception">{eMonth} {eDay}, {eYear}</h4>
                                    </div>
                                </div>
                                <div className="move-in-out">
                                    Gender Allowed: <h4>{gender}</h4>
                                </div>
                                <div className="move-in-out">
                                    <div className="move-date">
                                        Private Bedroom: <h4 className="exception">{box.privateBed}</h4>
                                    </div>
                                    <div className="move-date">
                                        Private Bathroom: <h4 className="exception">{box.privateBath}</h4>
                                    </div>
                                </div>
                                <div className="move-in-out">
                                    Parking: <h4>{box.parking}</h4>
                                </div>
                                <div className="move-in-out">
                                    Furnished: <h4>{box.furnished}</h4>
                                </div>


                                <div className="move-in-out">
                                    Roomates (not counting yourself): <h4>{box.roomates}</h4>
                                </div>
                                <div className="move-in-out">
                                    Other: <h4>{box.other}</h4>
                                </div>


                            </div>
                        </div>
                        <div className="msg-unique-button-apartment-div">
                            <Button onClick={() => this.openMessages()} variant="primary" size="lg">
                                Send a message!
                            </Button>
                        </div>

                    </div>


                </div >

            )
        }

    }
}