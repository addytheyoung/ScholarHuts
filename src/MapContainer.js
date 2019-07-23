import React from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import facebooklogo from "./facebooklogo.png";
import "./App.css";
import meme from "./spotlight-poi2_hdpi.png";

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      called: false
    };
  }

  render() {
    const arr = [];

    return (
      <Map
        google={this.props.google}
        zoom={13}
        initialCenter={{
          lat: 30.2849,
          lng: -97.7341
        }}
      >
        {this.props.stateS.map(entry => (
          <Marker
            key={entry.id}
            position={{
              lat: entry.lat,
              lng: entry.lng
            }}
            icon={{
              url: meme,
              scaledSize: new this.props.google.maps.Size(28, 40)
            }}
            onClick={event =>
              window.open("https://scholarhuts.com/post/" + entry.id, "_blank")
            }
            onMouseover={this.onMouseoverMarker}
            onMouseout={this.onMouseoutMarker}
            true={this.fetchPlaces}
          />
        ))}
      </Map>
    );
  }

  fetchPlaces(props, marker, event) {
    alert("fetch");
    console.log(props);
    console.log(marker);
    // a.children[0].props.setIcon({ url: meme, scaledSize: new window.google.maps.Size(44, 56) });
  }

  onMouseoverMarker = (props, marker, e) => {
    console.log(marker);

    if (this.state.called) {
      return null;
    } else {
      marker.setIcon({
        url: meme,
        scaledSize: new this.props.google.maps.Size(44, 56)
      });
      this.state.called = true;
    }
  };

  onMouseoutMarker = (props, marker, e) => {
    this.state.called = false;
    marker.setIcon({
      url: meme,
      scaledSize: new this.props.google.maps.Size(28, 40)
    });
  };
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCmgrSz2oQZHuMYoUoC0hD5VXpMZIyM0Bc"
})(MapContainer);
