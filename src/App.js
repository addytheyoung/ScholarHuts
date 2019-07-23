import React from 'react';

import './App.css';
import Board from './Board.js';
import Header from './Header.js';



export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: ["none", "none"],
      gender: "none",
      price: ["none", "none"],
      size: "none",
      bed: "none",
      bath: "none",
      parking: "none",
      furnished: "none",
      type: "University of Texas at Austin",
      type2: "Austin",
    }
  }

  filterPopup(popupModal, apply) {
    // Get the button that opens the modal
    // Get the <span> element that closes the modal
    popupModal.style.display = "block";
    window.onclick = event => {
      if (event.target == popupModal || event.target == apply) {
        popupModal.style.display = "none";

      }
    }
  }

  onChangeType = (newType) => {
    this.setState({ type: newType })
  }

  // Update the state.
  // Call render after getting all the proper user filters. Send render(val1, val2, ...) pulled from the state.
  // Give these to the Board object, where we will then pull from the database with the proper parameters. 

  // Send string as parameter from button onClick. Write some if statements changing setState depending on what the parameter was. 
  // Kind gacky, but it will work. 
  updateDate(apply, clear, filter, type) {
    apply.style.background = "#bf5700";
    apply.style.fontWeight = "bold";
    clear.style.display = "block";
    // This should be if statements. 

    if (type == "date") {
      this.setState({ date: filter })
    } else if (type == "gender") {
      this.setState({ gender: filter.value })
    } else if (type == "price") {
      this.setState({ price: filter })
    } else if (type == "size") {
      this.setState({ size: filter.value })
    } else if (type == "room") {
      this.setState({ bed: filter.value })
    } else if (type == "bath") {
      this.setState({ bath: filter.value })
    } else if (type == "parking") {
      this.setState({ parking: filter.value })
    } else if (type == "furnished") {
      this.setState({ furnished: filter.value })
    }
  }

  clearDate(apply, clear, form, type) {
    apply.style.background = "transparent";
    apply.style.fontWeight = "normal";
    clear.style.display = "none";


    if (type == "date") {
      this.setState({ date: ["none", "none"] })
    } else if (type == "gender") {
      this.setState({ gender: "none" })
    } else if (type == "price") {
      this.setState({ price: ["none", "none"] })
    } else if (type == "size") {
      this.setState({ size: "none" })
    } else if (type == "room") {
      this.setState({ bed: "none" })
    } else if (type == "bath") {
      this.setState({ bath: "none" })
    } else if (type == "parking") {
      this.setState({ parking: "none" })
    } else if (type == "furnished") {
      this.setState({ furnished: "none" })
    }
    if (form != null) {
      form.reset();
    }
  }

  // When I hit the "apply" or "clear" button is when I want to update the state and re-render the board. 
  render() {


    return (



      <div className="App">

        <div className="App-header" role="banner">
          <Header onChange={this.onChangeType.bind(this)} />

          <div className="filter-banner">
            <div id="date-banner" className="modal">
              <div className="date-banner-content">
                <div className="date-top-content">
                  <form id="form1">
                    <div>
                      <br /> <br />
                      Desired starting date? <input type="date" id="filter-starting-date" className="university" style={{ height: "100px", overflow: "visible" }} />
                      <br /> <br />
                      Desired ending date? <input type="date" id="filter-ending-date" className="university" style={{ height: "100px", overflow: "visible" }} />
                    </div>

                  </form>
                </div>
                <div className="button-list">

                  <button className="banner-button-apply" id="dates-button-apply" onClick={() => this.updateDate(document.getElementById('date-filter-id'), document.getElementById('banner-button-clear'), [document.getElementById('filter-starting-date'), document.getElementById('filter-ending-date')], "date")}>Apply</button>
                  <button className="banner-button-clear" id="banner-button-clear" onClick={() => this.clearDate(document.getElementById('date-filter-id'), document.getElementById('banner-button-clear'), document.getElementById("form1"), "date")}>Clear</button>

                </div>
              </div>

            </div>

            <div id="gender-banner" className="modal">

              <div className="date-banner-content">
                <br /> <br /> <br />
                <select id="gender-filter-option" className="university" style={{ width: "200px", height: "50px" }}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                (Single rooms will always show up)
                <div>
                  <button className="banner-button-apply" id="gender-button-apply" onClick={() => this.updateDate(document.getElementById('gender-filter-id'), document.getElementById('gender-button-clear'), document.getElementById('gender-filter-option'), "gender")}>Apply</button>
                  <button className="banner-button-clear" id="gender-button-clear" onClick={() => this.clearDate(document.getElementById('gender-filter-id'), document.getElementById('gender-button-clear'), null, "gender")}>Clear</button>
                </div>
              </div>
            </div>

            <div id="price-banner" className="modal">
              <div className="date-banner-content">
                Min Rent
                <select id="price-filter-min" className="university">
                  <option>
                    200
                  </option>
                  <option>
                    300
                  </option>
                  <option>
                    400
                  </option>
                  <option>
                    500
                  </option>
                  <option>
                    600
                  </option>
                  <option>
                    700
                  </option>
                  <option>
                    800
                  </option>
                  <option>
                    900
                  </option>
                  <option>
                    1000
                  </option>
                  <option>
                    1100
                  </option>
                  <option>
                    1200
                  </option>
                  <option>
                    1300
                  </option>
                  <option>
                    1400
                  </option>
                  <option>
                    1500
                  </option>
                </select>
                Max Rent
                <select id="price-filter-max" className="university">
                  <option>
                    200
                  </option>
                  <option>
                    300
                  </option>
                  <option>
                    400
                  </option>
                  <option>
                    500
                  </option>
                  <option>
                    600
                  </option>
                  <option>
                    700
                  </option>
                  <option>
                    800
                  </option>
                  <option>
                    900
                  </option>
                  <option>
                    1000
                  </option>
                  <option>
                    1100
                  </option>
                  <option>
                    1200
                  </option>
                  <option>
                    1300
                  </option>
                  <option>
                    1400
                  </option>
                  <option>
                    1500
                  </option>
                </select>
                <button className="banner-button-apply" id="price-button-apply" onClick={() => this.updateDate(document.getElementById('price-filter-id'), document.getElementById('price-button-clear'), [document.getElementById('price-filter-min'), document.getElementById('price-filter-max')], "price")}>Apply</button>
                <button className="banner-button-clear" id="price-button-clear" onClick={() => this.clearDate(document.getElementById('price-filter-id'), document.getElementById('price-button-clear'), null, "price")}>Clear</button>
              </div>
            </div>

            <div id="roomate-banner" className="modal">
              <div className="date-banner-content">

                <select id="roomate-filter-option" className="university">
                  <option>
                    0 roomates
                  </option>
                  <option>
                    1 roomate
                  </option>
                  <option>
                    2 roomates
                  </option>
                  <option>
                    3 roomates
                  </option>
                  <option>
                    4+ roomates
                  </option>
                </select>

                <button className="banner-button-apply" id="roomate-button-apply" onClick={() => this.updateDate(document.getElementById('roomate-filter-id'), document.getElementById('roomate-button-clear'), document.getElementById('roomate-filter-option'), "size")}>Apply</button>
                <button className="banner-button-clear" id="roomate-button-clear" onClick={() => this.clearDate(document.getElementById('roomate-filter-id'), document.getElementById('roomate-button-clear'), null, "size")}>Clear</button>
              </div>
            </div>

            <div id="pvtroom-banner" className="modal">
              <div className="date-banner-content">
                <select id="pvt-filter-option" className="university">
                  <option>
                    Yes, I want my own bedroom.
                  </option>
                  <option>
                    No, I don't want my own bedroom.
                  </option>
                </select>
                <button className="banner-button-apply" id="pvt-button-apply" onClick={() => this.updateDate(document.getElementById('pvt-filter-id'), document.getElementById('pvt-button-clear'), document.getElementById('pvt-filter-option'), "room")}>Apply</button>
                <button className="banner-button-clear" id="pvt-button-clear" onClick={() => this.clearDate(document.getElementById('pvt-filter-id'), document.getElementById('pvt-button-clear'), null, "room")}>Clear</button>
              </div>
            </div>

            <div id="pvtbath-banner" className="modal">
              <div className="date-banner-content">
                <select id="bath-filter-option" className="university">
                  <option>
                    Yes, I want my own bathroom.
                  </option>
                  <option>
                    No, I don't want my own bathroom.
                  </option>
                </select>
                <button className="banner-button-apply" id="bath-button-apply" onClick={() => this.updateDate(document.getElementById('bath-filter-id'), document.getElementById('bath-button-clear'), document.getElementById('bath-filter-option'), "bath")}>Apply</button>
                <button className="banner-button-clear" id="bath-button-clear" onClick={() => this.clearDate(document.getElementById('bath-filter-id'), document.getElementById('bath-button-clear'), null, "bath")}>Clear</button>
              </div>
            </div>

            <div id="parking-banner" className="modal">
              <div className="date-banner-content">
                <select id="parking-filter-option" className="university">
                  <option>
                    Yes, I need parking.
                  </option>
                  <option>
                    No, I don't need parking.
                  </option>
                </select>
                <button className="banner-button-apply" id="parking-button-apply" onClick={() => this.updateDate(document.getElementById('parking-filter-id'), document.getElementById('parking-button-clear'), document.getElementById('parking-filter-option'), "parking")}>Apply</button>
                <button className="banner-button-clear" id="parking-button-clear" onClick={() => this.clearDate(document.getElementById('parking-filter-id'), document.getElementById('parking-button-clear'), null, "parking")}>Clear</button>
              </div>
            </div>

            <div id="furnished-banner" className="modal">
              <div className="date-banner-content">
                <select id="furnished-filter-option" className="university">
                  <option>
                    Yes, I need a furnished apartment.
                  </option>
                  <option>
                    No, I don't need a furnished apartment.
                  </option>
                </select>
                <button className="banner-button-apply" id="furnished-button-apply" onClick={() => this.updateDate(document.getElementById('furnished-filter-id'), document.getElementById('furnished-button-clear'), document.getElementById('furnished-filter-option'), "furnished")}>Apply</button>
                <button className="banner-button-clear" id="furnished-button-clear" onClick={() => this.clearDate(document.getElementById('furnished-filter-id'), document.getElementById('furnished-button-clear'), null, "furnished")}>Clear</button>
              </div>
            </div>

            <div id="more-banner" className="modal">
              <div className="date-banner-content">
                <h1>More coming soon!</h1>
              </div>
            </div>


            <div id="filter-start">
              <h2>Filters</h2>
            </div>
            <div>
              <button onClick={() => this.filterPopup(document.getElementById("date-banner"), document.getElementById("dates-button-apply"))} className="filter-button" id="date-filter-id">Dates</button>
            </div>
            <div>
              <button onClick={() => this.filterPopup(document.getElementById("gender-banner"), document.getElementById("gender-button-apply"))} className="filter-button" id="gender-filter-id">Gender</button>
            </div>
            <div>
              <button onClick={() => this.filterPopup(document.getElementById("price-banner"), document.getElementById("price-button-apply"))} className="filter-button" id="price-filter-id">Price</button>
            </div>
            <div>
              <button onClick={() => this.filterPopup(document.getElementById("roomate-banner"), document.getElementById("roomate-button-apply"))} className="filter-button" id="roomate-filter-id">Size</button>
            </div>
            <div>
              <button onClick={() => this.filterPopup(document.getElementById("pvtroom-banner"), document.getElementById("pvt-filter-apply"))} className="filter-button" id="pvt-filter-id">Private Bedroom</button>
            </div>
            <div>
              <button onClick={() => this.filterPopup(document.getElementById("pvtbath-banner"), document.getElementById("bath-filter-apply"))} className="filter-button" id="bath-filter-id">Private Bathroom</button>
            </div>
            <div>
              <button onClick={() => this.filterPopup(document.getElementById("parking-banner"), document.getElementById("parking-filter-apply"))} className="filter-button" id="parking-filter-id">Parking</button>
            </div>
            <div>
              <button onClick={() => this.filterPopup(document.getElementById("furnished-banner"), document.getElementById("furnished-filter-apply"))} className="filter-button" id="furnished-filter-id">Furnished</button>
            </div>
            <div>
              <button onClick={() => this.filterPopup(document.getElementById("more-banner"), document.getElementById("more-filter-apply"))} className="filter-button">More filters</button>
            </div>
          </div>

        </div>


        <body className="App-body">

          <Board
            dateFilter={this.state.date}
            genderFilter={this.state.gender}
            priceFilter={this.state.price}
            sizeFilter={this.state.size}
            bedFilter={this.state.bed}
            bathFilter={this.state.bath}
            parkingFilter={this.state.parking}
            furnishedFilter={this.state.furnished}
            type={this.state.type}
            type2={this.state.type2}
          />

        </body>
      </div>

    );
  }
}