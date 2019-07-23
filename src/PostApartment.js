import React from 'react';
import logo from './Texas_Longhorns_logo.svg';
import './style2.css';
import * as firebase from 'firebase';
import GoogleSuggest from './GoogleSuggest.js';
import Button from 'react-bootstrap/Button';




export default class PostApartment extends React.Component {
    constructor(props) {

        super(props);
        this.asdf = 1;
        this.globalImgURLS = [];



        const statsRef2 = firebase.firestore().doc("Austin/--stats--");
        statsRef2.get().then(function (doc) {
            return doc.data().storyCount;
        }).then((boi) => {

            this.asdf = boi;
        })

    }
    // Instead of putting the images on the cloud when I click submitPost, we are going to call a method to put them on the cloud as soon as they are
    // placed in the text-box.

    // Need a way to store an array of image URL's

    uploadFiles() {

        var fileButton = document.getElementById('image_uploads');
        for (var i = 0; i < fileButton.files.length; i++) {
            var file = fileButton.files[i];
            var storageRef = firebase.storage().ref(this.asdf + '/' + file.name);
            var task = storageRef.put(file);
        }
    }

    checkPost() {
        if (document.getElementById('gender-select').value === '-') {
            alert('Please choose a gender.')
        } else if (document.getElementById('start-date').value === '-') {
            alert('Please choose a starting MONTH.')
        } else if (document.getElementById('end-date').value === '-') {
            alert('Please choose an ending MONTH.')
        } else if (document.getElementById('charge-id').value === '') {
            alert('Please input how much you will charge.')
        } else if (document.getElementById('num-bed-id').value === '-') {
            alert('Please choose how many BEDROOMS are in the apartment.')
        } else if (document.getElementById('private-bed-id').value === '-') {
            alert('Please choose if your sublet will have a private BEDROOM.')
        } else if (document.getElementById('num-bath-id').value === '-') {
            alert('Please choose how many BATHROOMs are in the apartment.')
        } else if (document.getElementById('private-bath-id').value === '-') {
            alert('Please choose if your sublet will have a private BATHROOM')
        } else if (document.getElementById('roomates-id').value === '-') {
            alert('Please put how many roomates the leaser will have.')
        } else if (document.getElementById('furnished-id').value === '-') {
            alert('Please choose whether or not your apartment will be furnished.')
        } else if (document.getElementById('parking-id').value === '-') {
            alert('Please choose whether or not you sublet will have parking.')
        } else if (document.getElementById('address-id').value === '') {
            alert('Please choose a valid address.')
        } else if (document.getElementById('name-id').value === '') {
            alert('Please input an apartment name!')
        }
        else {
            this.submitPost();
        }
    }

    helper() {
        var fileButton = document.getElementById('image_uploads');

        var arr = [];
        for (var i = 0; i < fileButton.files.length; i++) {
            var file = fileButton.files[i];
            var storageRef = firebase.storage().ref(this.asdf + '/' + file.name);
            var prom = storageRef.getDownloadURL().then((url) => {
                arr.push(url);
                return arr;

            }).catch((e) => {
                alert('Please wait for the images to finish uploading!');
            })
        }
        if (prom != null) {
            return prom;
        } else {
            var secondStorageRef = firebase.storage().ref("Texas_Longhorns_logo.svg").getDownloadURL().then((url) => {
                const arr2 = [];
                arr2.push(url)
                return arr2;
            })
            return secondStorageRef;
        }
    }

    submitPost() {
        this.helper().then((a) => {



            var firestore = firebase.firestore();

            const increment = firebase.firestore.FieldValue.increment(1);
            const statsRef = firestore.collection('Austin').doc('--stats--');
            statsRef.set({ storyCount: increment }, { merge: true });


            firestore.collection("Austin").doc("University of Texas at Austin").collection("Sublets").where("uid", "==", firebase.auth().currentUser.uid).get().then(b => {


                if (b.empty != true || b.size != 0) {
                    alert('You have already posted! Delete your post to post again.')
                } else {


                    firestore.collection("Austin").doc("University of Texas at Austin").collection("Sublets").doc(this.asdf.toString()).set({
                        gender: document.getElementById('gender-select').value,
                        startDate: document.getElementById('start-date').value,
                        endDate: document.getElementById('end-date').value,
                        charge: document.getElementById('charge-id').value,
                        numBeds: document.getElementById('num-bed-id').value,
                        privateBed: document.getElementById('private-bed-id').value,
                        numBath: document.getElementById('num-bath-id').value,
                        privateBath: document.getElementById('private-bath-id').value,
                        roomates: document.getElementById('roomates-id').value,
                        furnished: document.getElementById('furnished-id').value,
                        parking: document.getElementById('parking-id').value,
                        address: document.getElementById('address-id').value,
                        uniqueId: this.asdf,
                        imgURLS: a,
                        name: document.getElementById('name-id').value,
                        uid: firebase.auth().currentUser.uid,

                        pool: document.getElementById('pool').value,
                        gym: document.getElementById('gym').value,
                        balcony: document.getElementById('balcony').value,
                        gameRoom: document.getElementById('gameroom').value,
                        studyRoom: document.getElementById('studyroom').value,
                        kitchen: document.getElementById('kitchen').value,
                        pets: document.getElementById('pets').value,
                        other: document.getElementById('optional-other').value,

                    }).then(() => {
                        alert('Successfully Submitted!')

                        window.location.reload();
                    }).catch(() => {
                        alert('Failed to submit.')
                    })


                }

            })
            // firestore.collection("Austin").doc("University of Texas at Austin").collection("Sublets").doc(firebase.auth().currentUser.uid).set({
        });

    }

    render() {

        return (
            <body>
                <div id="root">
                    <div class="header-banner">
                        <div class="div-logo">
                            <a href="/sublets">
                                <img src={logo} class="logo-img" id="zzzzz" />
                            </a>
                        </div>
                        <div class="div-step">
                            Post your apartment
                        </div>
                    </div>

                    <br /> <br /> <br /> <br />
                    <div class="body-form">


                        <div class="section">
                            <div class="div-step">
                                What does the lease start? <br />

                            </div>
                            <div>
                                <input type="date" id="start-date" />
                            </div>

                        </div>

                        <div class="section">
                            <div class="div-step">
                                When does the lease end?
                            </div>

                            <div>
                                <input type="date" id="end-date" />
                            </div>

                        </div>

                        <div class="section">
                            <div class="div-step">
                                Upload photos! (Don't drag for multiple photos)
                            </div>
                            <input type="file" id="image_uploads" name="image_uploads" accept="image/*,.pdf" multiple={true} onChange={() => this.uploadFiles()} />
                        </div>


                        <div class="section">
                            <div class="div-step">
                                What gender(s) live in your apartment? (Both for single)
                            </div>

                            <select id="gender-select">
                                <option>-</option>
                                <option id="gender-select-option">
                                    Male
                                </option>
                                <option>
                                    Female
                                </option>
                                <option>
                                    Both
                                </option>
                            </select>



                        </div>
                        <div class="section">
                            <div class="div-step">
                                What is the name of the apartment complex?
                            </div>

                            <input id="name-id" />
                        </div>

                        <div class="section">
                            <div class="div-step">
                                How much will you charge the subleaser each month?
                            </div>

                            <input id="charge-id" type="number" max="10000" min="1" />
                        </div>



                        <div class="section">
                            <div class="div-step">
                                How many bedrooms are in your apartment?
                            </div>

                            <select id="num-bed-id">
                                <option>-</option>
                                <option>
                                    1 bedroom
                                </option>
                                <option>
                                    2 bedrooms
                                </option>
                                <option>
                                    3 bedrooms
                                </option>
                                <option>
                                    4 bedrooms
                                </option>
                                <option>
                                    5 bedrooms
                                </option>
                                <option>
                                    6+ bedrooms
                                </option>
                            </select>
                        </div>

                        <div class="section">
                            <div class="div-step">
                                Does the leaser get a private bedroom?
                            </div>

                            <select id="private-bed-id">
                                <option>-</option>
                                <option>
                                    Yes, they get a private bedroom.
                                </option>
                                <option>
                                    No, they sleep in a room with 1 other person.
                                </option>
                                <option>
                                    No, they sleep in a room with 2 other people.
                                </option>
                                <option>
                                    No, they sleep in a room with 3+ other people.
                                </option>
                            </select>

                        </div>

                        <div class="section">
                            <div class="div-step">
                                How many bathrooms in the apartment?
                            </div>

                            <select id="num-bath-id">
                                <option>-</option>
                                <option>
                                    1 bathroom
                                </option>
                                <option>
                                    2 bathrooms
                                </option>
                                <option>
                                    3 bathrooms
                                </option>
                                <option>
                                    4+ bathrooms
                                </option>
                            </select>
                        </div>

                        <div class="section">
                            <div class="div-step">
                                Does the leaser get a private bathroom?
                            </div>
                            <select id="private-bath-id">
                                <option>-</option>
                                <option>
                                    Yes, they get a private bathroom.
                                </option>
                                <option>
                                    No, they share a bathroom with 1 other person.
                                </option>
                                <option>
                                    No, they share a bathroom with 2 other people.
                                </option>
                                <option>
                                    No, they share a bathroom with 3+ other people.
                                </option>
                            </select>
                        </div>
                        <div class="section">
                            <div class="div-step">
                                How many roomates? (0 for single)
                            </div>
                            <select id="roomates-id">
                                <option>-</option>
                                <option>
                                    0
                                </option>
                                <option>
                                    1
                                </option>
                                <option>
                                    2
                                </option>
                                <option>
                                    3
                                </option>
                                <option>
                                    4+
                                </option>
                            </select>
                        </div>

                        <div class="section">
                            <div class="div-step">
                                Will the apartment be mostly furnished?
                            </div>
                            <select id="furnished-id">
                                <option>-</option>
                                <option>
                                    Yes, it will be mostly furnished.
                                </option>
                                <option>
                                    No, it will not be mostly furnished.
                                </option>
                            </select>
                        </div>

                        <div class="section">
                            <div class="div-step">
                                What is the street address?
                            </div>

                            <GoogleSuggest />
                        </div>

                        <div class="section">
                            <div class="div-step">
                                What about parking?
                            </div>
                            <select id="parking-id">
                                <option>-</option>
                                <option>
                                    Yes, parking is included in the price.
                                </option>
                                <option>
                                    No, but it can be added for additional cost.
                                </option>
                                <option>
                                    No, parking is not an option.
                                </option>
                            </select>

                        </div>

                        <div class="section">
                            <div class="div-step">
                                (Optional)
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <div>
                                    Pool?
                                </div>
                                <input type="checkbox" className="checkbox-input" id="pool" value="Pool"></input>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <div>
                                    Gym?
                                </div>
                                <input type="checkbox" className="checkbox-input" id="gym" value="Gym"></input>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <div>
                                    Balcony?
                                </div>
                                <input type="checkbox" className="checkbox-input" id="balcony" value="Balcony"></input>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <div>
                                    Game Room?
                                </div>
                                <input type="checkbox" className="checkbox-input" id="gameroom" value="Game Room"></input>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <div>
                                    Study Room(s)?
                                </div>
                                <input type="checkbox" className="checkbox-input" id="studyroom" value="Study Room"></input>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <div>
                                    Kitchen?
                                </div>
                                <input type="checkbox" className="checkbox-input" id="kitchen" value="Kitchen"></input>
                            </div>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <div>
                                    Pets allowed?
                                </div>
                                <input type="checkbox" className="checkbox-input" id="pets" value="Pets Allowed"></input>
                            </div>
                        </div>

                        <div class="section">
                            <div class="div-step">
                                (Optional) <br />
                                What else do you want to say? (About yourself, the apartment, or anything)
                            </div>
                            <textarea id="optional-other"></textarea>
                        </div>

                        <div className="form-submit-div">
                            <Button id="submit-button" onClick={() => this.checkPost()}>Post the apartment!</Button>
                        </div>
                    </div>

                </div>
            </body >
        )
    }
}