import React from "react";
import Apartment from "./Apartment";
//import { withScriptjs, GoogleMap, withGoogleMap, Marker } from 'react-google-maps';
//import { withScriptjs, GoogleMap, withGoogleMap } from 'react-google-maps';
import * as firebase from "firebase";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Geocode from "react-geocode";
import Spinner from "react-bootstrap/Spinner";
import facebooklogo from "./Map-Marker-Free-Download-PNG.png";
import googlelogo from "./googlelogo.png";
import MapContainer from "./MapContainer.js";

export default class Board extends React.Component {
  // Constructor is only called once, and never called again.
  // May need to move some code around up here.
  constructor(props) {
    super(props);

    this.aptIDS = [];

    this.state = {
      stateBox: null,
      realStateBox: null,
      page: 1,
      docsFailed: 0,
      latLng: null
    };

    if (
      window.location.pathname === "/sublets" ||
      window.location.pathname === "/"
    ) {
      var temp = [];
      const fStore = firebase.firestore();
      fStore
        .collection(this.props.type2)
        .doc(this.props.type)
        .collection("Sublets")
        .orderBy("uniqueId")
        .get()
        .then(collection => {
          var docs = collection.docs;
          var j = 0;

          while (docs[j] != null) {
            temp.push(docs[j].data());
            j++;
          }
          const latLngArr = [];
          var j = 0;
          if (temp.length == 0) {
            this.setState({
              latLng: [],
              realStateBox: []
            });
          }
          for (var i = 0; i < temp.length; i++) {
            var apt = temp[i];
            Geocode.setApiKey("AIzaSyCmgrSz2oQZHuMYoUoC0hD5VXpMZIyM0Bc");
            const id = apt.uniqueId;
            const price = apt.charge;
            var boi = Geocode.fromAddress(apt.address).then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                return { lat, lng, id, price };
              },
              error => {
                console.log("error");
              }
            );
            boi.then(gob => {
              if (gob != null && gob != undefined) {
                latLngArr.push(gob);
              }

              if (j === temp.length - 1) {
                this.setState({
                  latLng: latLngArr,
                  stateBox: temp,
                  realStateBox: temp,
                  page: 1,
                  docsFailed: 0
                });
              }
              j++;
            });
          }
        });
    }
  }

  // Get boxes is not being called.
  getBoxes(temp) {
    if (temp == null) {
      return [];
    } else {
      // Hitting else twice every time we refresh

      var final = [];
      for (var apt = 0; apt < temp.length; apt++) {
        // Here is where I check all of my fitlers.
        // If the apartment doesn't fit the filter, do not push it onto final (continue)
        var newApt = [
          temp[apt].gender,
          temp[apt].startDate,
          temp[apt].endDate,
          temp[apt].age,
          temp[apt].pay,
          temp[apt].charge,
          temp[apt].numBeds,
          temp[apt].privateBed,
          temp[apt].numBath,
          temp[apt].privateBath,
          temp[apt].address,
          temp[apt].uniqueId,
          temp[apt].imgURLS,
          temp[apt].name,
          temp[apt].uid,
          temp[apt].pool,
          temp[apt].gym,
          temp[apt].balcony,
          temp[apt].gameRoom,
          temp[apt].studyRoom,
          temp[apt].kitchen,
          temp[apt].pets,
          temp[apt].other
        ];
        final.push(newApt);
        // Convert address into coordinates here? Would be much more efficient
        // Make a new state object that just holds the coordinates?
      }

      // Realstatebox should hold what we need it to hold now.

      return final.map(allImages => ({
        gender: allImages[0],
        startDate: allImages[1],
        endDate: allImages[2],
        age: allImages[3],
        pay: allImages[4],
        charge: allImages[5],
        numBeds: allImages[6],
        privateBed: allImages[7],
        numBath: allImages[8],
        privateBath: allImages[9],
        address: allImages[10],
        uniqueId: allImages[11],
        imgURLS: allImages[12],
        name: allImages[13],
        uid: allImages[14],
        pool: allImages[15],
        gym: allImages[16],
        balcony: allImages[17],
        gameroom: allImages[18],
        studyroom: allImages[19],
        kitchen: allImages[20],
        pets: allImages[21],
        other: allImages[22]
      }));
    }
  }

  changePage(pageNum) {
    if (this.state.page == 1 && pageNum == -1) {
      alert("No previous pages");
    } else if (
      this.state.page * 5 >= this.state.realStateBox.length &&
      pageNum == 1
    ) {
      alert("No next pages");
    } else {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.setState({
        page: this.state.page + pageNum
      });
    }
  }

  functionFromBoardToApartments = dataFromChild => {
    // console.log(dataFromChild);
    const uniqueId = dataFromChild.uniqueId;
    // console.log(uniqueId);
    //   console.log(this.state.latLng);
    this.state.latLng.forEach((entry, index) => {
      if (entry.id === uniqueId) {
        entry.magnify = true;
        this.state.latLng[index] = entry;
        this.setState({ latLng: this.state.latLng });
        return;
      }
    });
    // console.log(this.state.latLng);
    // return;
  };

  functionFromBoardToApartments2 = dataFromChild => {
    const uniqueId = dataFromChild.uniqueId;

    this.state.latLng.forEach((entry, index) => {
      if (entry.id === uniqueId) {
        entry.magnify = false;
        this.state.latLng[index] = entry;
        this.setState({ latLng: this.state.latLng });
        return;
      }
    });
  };

  componentWillReceiveProps(newProps) {
    // Upon recieving filter: take back to first page?
    if (this.state.stateBox == null) {
      return null;
    }
    this.state.realStateBox = null;
    this.state.latLng = null;
    const startDate = newProps.dateFilter[0];
    const endDate = newProps.dateFilter[1];
    const gender = newProps.genderFilter;
    const startPrice = newProps.priceFilter[0];
    const endPrice = newProps.priceFilter[1];

    var passDate = true;

    const preFilter = [];
    var j = 0;
    while (j < this.state.stateBox.length) {
      const apt = this.state.stateBox[j];

      // Dates filter!!!
      while (startDate != "none") {
        const buyerStartYear = parseInt(startDate.value.substring(0, 4));
        const sellerStartYear = parseInt(
          apt.startDate.toString().substring(0, 4)
        );
        const buyerEndYear = parseInt(endDate.value.substring(0, 4));
        const sellerEndYear = parseInt(apt.endDate.toString().substring(0, 4));

        if (buyerStartYear < sellerStartYear || buyerEndYear > sellerEndYear) {
          passDate = false;
          break;
        } else if (buyerStartYear === sellerStartYear) {
          // Starting year is same. Compare starting months.
          const sellerStartMonth = parseInt(
            apt.startDate.toString().substring(5, 7)
          );
          const buyerStartMonth = parseInt(startDate.value.substring(5, 7));
          if (buyerStartMonth < sellerStartMonth) {
            passDate = false;
            break;
          } else if (buyerStartMonth === sellerStartMonth) {
            const buyerStartDay = parseInt(startDate.value.substring(8, 10));
            const sellerStartDay = parseInt(
              apt.startDate.toString().substring(8, 10)
            );
            if (buyerStartDay < sellerStartDay) {
              passDate = false;
              break;
            }
          }
        }
        if (buyerEndYear === sellerEndYear) {
          // Ending year is same. Compare ending months.
          const sellerEndMonth = parseInt(
            apt.endDate.toString().substring(5, 7)
          );
          const buyerEndMonth = parseInt(endDate.value.substring(5, 7));
          if (buyerEndMonth > sellerEndMonth) {
            passDate = false;
            break;
          } else if (buyerEndMonth === sellerEndMonth) {
            const buyerEndDay = parseInt(endDate.value.substring(8, 10));
            const sellerEndDay = parseInt(
              apt.endDate.toString().substring(8, 10)
            );
            if (buyerEndDay > sellerEndDay) {
              passDate = false;
              break;
            }
          }
        }
        break;
      }

      if (startDate != "none" && !passDate) {
        j++;
        continue;
      }

      // Gender filter!!!!

      if (
        gender != "none" &&
        gender != apt.gender &&
        (apt.numBath[0] != 1 || apt.numBeds[0] != 1) &&
        apt.gender != "Both"
      ) {
        j++;
        continue;
      }

      // Price filter!!!
      if (
        startPrice != "none" &&
        (parseInt(apt.charge) < parseInt(startPrice.value) ||
          parseInt(apt.charge) > parseInt(endPrice.value))
      ) {
        j++;
        continue;
      }
      // Size filter

      const size = newProps.sizeFilter;

      if (
        size != "none" &&
        newProps.sizeFilter[0].toString() != apt.roomates.toString()
      ) {
        j++;
        continue;
      }

      const room = newProps.bedFilter.toString();
      if (room != "none") {
        if (
          (room == "Yes, I want my own bedroom." &&
            apt.privateBed != "Yes, they get a private bedroom.") ||
          (room == "No, I don't want my own bedroom." &&
            apt.privateBed == "Yes, they get a private bedroom.")
        ) {
          j++;
          continue;
        }
      }

      const bath = newProps.bathFilter.toString();
      if (bath != "none") {
        if (
          (bath == "Yes, I want my own bathroom." &&
            apt.privateBath != "Yes, they get a private bathroom.") ||
          (bath == "No, I don't want my own bathroom." &&
            apt.privateBath == "Yes, they get a private bathroom.")
        ) {
          j++;
          continue;
        }
      }

      const parking = newProps.parkingFilter.toString();
      if (parking != "none") {
        if (
          (parking == "Yes, I need parking." &&
            apt.parking == "No, parking is not an option.") ||
          (parking == "No, I don't need parking." &&
            apt.parking == "Yes, parking is included in the price.")
        ) {
          j++;
          continue;
        }
      }
      const furnished = newProps.furnishedFilter;
      if (furnished != "none") {
        if (
          (furnished == "Yes, I need a furnished apartment." &&
            apt.furnished == "No, it will not be mostly furnished.") ||
          (furnished == "No, I don't need a furnished apartment." &&
            apt.furnished == "Yes, it will be mostly furnished.")
        ) {
          j++;
          continue;
        }
      }
      preFilter.push(apt);
      j++;
    }

    const latLngArr = [];
    var j = 0;
    if (preFilter.length == 0) {
      this.setState({
        latLng: [],
        realStateBox: []
      });
    }
    for (var i = 0; i < preFilter.length; i++) {
      var apt = preFilter[i];
      const id = apt.uniqueId;
      var boi = Geocode.fromAddress(apt.address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          return { lat, lng, id };
        },
        error => {
          console.log("error");
        }
      );
      boi.then(gob => {
        if (gob != null && gob != undefined) {
          latLngArr.push(gob);
        }

        if (j === preFilter.length - 1) {
          this.setState({
            latLng: latLngArr,
            realStateBox: preFilter
          });
        }
        j++;
      });
    }
  }

  render() {
    if (
      (this.state.realStateBox == null || this.state.latLng == null) &&
      (window.location.pathname === "/sublets" ||
        window.location.pathname === "/")
    ) {
      return (
        <Spinner
          animation="border"
          role="status"
          style={{
            marginLeft: "48vw",
            marginTop: "30vh"
          }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      if (
        window.location.pathname === "/sublets" ||
        window.location.pathname === "/"
      ) {
        var arr = [];

        var j = this.state.realStateBox.length - 1 - this.state.page * 5 + 5;
        while (j > this.state.realStateBox.length - 1 - this.state.page * 5) {
          if (this.state.realStateBox[j] === undefined) {
            break;
          }
          arr.push(this.state.realStateBox[j]);
          j--;
        }
        arr = this.getBoxes(arr);
      }

      //const WrappedMap = withScriptjs(withGoogleMap(this.Map));

      return (
        <Router>
          <Route
            exact={true}
            path="/apartments"
            render={() => <h1>Apartments Coming soon!</h1>}
          />
          <Route
            exact={true}
            path="/"
            render={() => (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: 500, marginLeft: "26px" }}>
                  {this.state.realStateBox.length} sublets found
                </div>
                <div className="body-container">
                  <Apartment
                    allBoxes={arr}
                    func={this.functionFromBoardToApartments}
                    func2={this.functionFromBoardToApartments2}
                  />
                  <div className="map-all">
                    <div className="map-outer-wrap" />
                    <div className="googleMap">
                      <MapContainer stateS={this.state.latLng} />
                    </div>
                  </div>
                </div>
                <div className="page-change-button">
                  <h1>Page {this.state.page}</h1>
                  <button id="page1" onClick={() => this.changePage(-1)}>
                    Prev
                  </button>
                  <button id="page2" onClick={() => this.changePage(1)}>
                    Next
                  </button>
                </div>
              </div>
            )}
          />
          <Route
            exact={true}
            path="/sublets"
            render={() => (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: 500, marginLeft: "26px" }}>
                  {this.state.realStateBox.length} sublets found
                </div>
                <div className="body-container">
                  <Apartment allBoxes={arr} />
                  <div className="map-all">
                    <div className="map-outer-wrap" />
                    <div className="googleMap">
                      <MapContainer stateS={this.state.latLng} />
                    </div>
                  </div>
                </div>
                <div className="page-change-button">
                  <h1>Page {this.state.page}</h1>
                  <button id="page1" onClick={() => this.changePage(-1)}>
                    Prev
                  </button>
                  <button id="page2" onClick={() => this.changePage(1)}>
                    Next
                  </button>
                </div>
              </div>
            )}
          />
        </Router>
      );
    }
  }
}
