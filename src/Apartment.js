import React from "react";
import logo from "./logo.svg";
import App from "./App";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Geocode from "react-geocode";
import ImageWheel from "./ImageWheel.js";
import RouterTest from "./RouterTest.js";
import "./App.css";
import SendAMessage from "./SendAMessage.js";
import Button from "react-bootstrap/Button";

export default class Apartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null
    };
  }

  sendMessage(uid) {
    var modalProfile = document.getElementById("send-message-comp");

    modalProfile.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modalProfile) {
        modalProfile.style.display = "none";
      }
    };
    this.setState({
      uid: uid
    });
  }

  hoverShit(box) {
    this.props.func(box);
  }

  render() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const allBoxes = this.props.allBoxes.map(box => {
      var gender = box.gender;
      const sYear = box.startDate.substring(0, 4);
      var sMonth = parseInt(box.startDate.substring(5, 7));
      sMonth = monthNames[sMonth - 1];
      const sDay = box.startDate.substring(8, 10);

      const eYear = box.endDate.substring(0, 4);
      var eMonth = parseInt(box.endDate.substring(5, 7));
      eMonth = monthNames[eMonth - 1];
      const eDay = box.endDate.substring(8, 10);

      const numBeds = box.numBeds[0];
      var privateBed = box.privateBed;
      const numBath = box.numBath[0];
      var privateBath = box.privateBath;
      var address = box.address;
      const parking = box.parking;
      for (var i = 0; i < address.length; i++) {
        if (address[i] === ",") {
          address = address.substring(0, i);
          break;
        }
      }

      var utc = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");

      if (privateBed == "No, they sleep in a room with another person.") {
        privateBed = "1 Roomate";
      } else if (
        privateBed == "No, they sleep in a room with 2 other people."
      ) {
        privateBed = "2 Roomates";
      } else if (
        privateBed == "No, they sleep in a room with 3+ other people."
      ) {
        privateBed = "3+ Roomates";
      } else {
        privateBed = "Private bed";
      }

      if (privateBath == "No, they share a bathroom with 1 other person.") {
        privateBath = "1 Bathmate";
      } else if (
        privateBath == "No, they share a bathroom with 2 other people."
      ) {
        privateBath = "2 Bathmates";
      } else if (
        privateBath == "No, they sleep in a room with 3+ other people."
      ) {
        privateBath = "3+ Bathmates";
      } else {
        privateBath = "Private bath";
      }

      if (numBeds == 1 && numBath == 1) {
        gender = "Single";
      }

      return (
        <Router>
          <div
            className="box"
            onMouseEnter={() => this.hoverShit(box)}
            id={box.uid}
          >
            <div className="box-link">
              <div className="box-content">
                <div className="box-div-img">
                  <ImageWheel images={box.imgURLS} uniqueId={box.uniqueId} />
                </div>
                <a
                  className="apartment-attributes"
                  href={/post/ + box.uniqueId}
                  target="_blank"
                >
                  <div className="apartment-attributes">
                    <div className="top-box">
                      <div className="top-left-box">
                        <div className="roomate-attributes">
                          <div>{gender}</div>
                          <div>·</div>
                          <div>
                            {numBeds} bed x {numBath} bath
                          </div>
                        </div>
                        <div className="room-attributes">
                          <div>{privateBed}</div>
                          <div>·</div>
                          <div>{privateBath}</div>
                        </div>
                        <div className="roomate-attributes">
                          <div>{address}</div>
                        </div>
                        <div className="roomate-attributes">
                          <div>{box.name}</div>
                        </div>
                      </div>

                      <div className="apt-message-button">
                        <Button
                          onClick={event => {
                            event.preventDefault();
                            event.stopPropagation();
                            this.sendMessage(box.uid);
                          }}
                          variant="primary"
                          size="sm"
                        >
                          Send a message!
                        </Button>
                      </div>
                    </div>
                    <div className="important-attributes">
                      <div className="apartment-dates">
                        <div>
                          {sMonth} {sDay}, {sYear}
                        </div>

                        <div>
                          {eMonth} {eDay}, {eYear}
                        </div>
                      </div>
                      <div>${box.charge}/month</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Router>
      );
    });
    return (
      <div className="box-container">
        <div className="send-message-comp" id="send-message-comp">
          <div className="send-message-content">
            <SendAMessage them={this.state.uid} />
          </div>
        </div>
        {allBoxes}
      </div>
    );
  }
}
