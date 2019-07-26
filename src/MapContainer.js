import React from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import facebooklogo from "./orangemarker.svg";
import "./App.css";
import meme from "./spotlight-poi2_hdpi.png";
import meme2 from "./isthisreallyit.svg";

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      called: false
    };
  }

  render() {
    const arr = [];

    return (
      <Map
        id="12345678"
        google={this.props.google}
        zoom={13}
        initialCenter={{
          lat: 30.2849,
          lng: -97.7341
        }}
        onMouseover={this.mapshit}
        streetViewControl={false}
        mapTypeControl={false}
      >
        {this.props.stateS.map(
          entry => {
            if (entry.magnify) {
              return (
                <Marker
                  key={entry.id}
                  position={{
                    lat: entry.lat,
                    lng: entry.lng
                  }}
                  icon={{
                    url: facebooklogo,
                    scaledSize: new this.props.google.maps.Size(40, 40)
                  }}
                  onClick={event =>
                    window.open(
                      "https://scholarhuts.com/post/" + entry.id,
                      "_blank"
                    )
                  }
                  onMouseover={this.onMouseoverMarker}
                  onMouseout={this.onMouseoutMarker}
                  label={{
                    text: entry.price,
                    fontWeight: "500",
                    fontFamily:
                      "Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",

                    color: "white"
                  }}
                  zIndex={200}
                />
              );
            } else {
              return (
                <Marker
                  key={entry.id}
                  position={{
                    lat: entry.lat,
                    lng: entry.lng
                  }}
                  icon={{
                    url: meme2,
                    scaledSize: new this.props.google.maps.Size(40, 40)
                  }}
                  onClick={event =>
                    window.open(
                      "https://scholarhuts.com/post/" + entry.id,
                      "_blank"
                    )
                  }
                  onMouseover={this.onMouseoverMarker}
                  onMouseout={this.onMouseoutMarker}
                  label={{
                    text: entry.price,
                    fontWeight: "700",
                    fontFamily:
                      "Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",

                    color: "black"
                  }}
                  //label={"$" + entry.price.toString()}
                />
              );
            }
          }
          // <Marker
          //   key={entry.id}
          //   position={{
          //     lat: entry.lat,
          //     lng: entry.lng
          //   }}
          //   icon={{
          //     url: meme,
          //     scaledSize: new this.props.google.maps.Size(28, 40)
          //   }}
          //   onClick={event =>
          //     window.open("https://scholarhuts.com/post/" + entry.id, "_blank")
          //   }
          //   onMouseover={this.onMouseoverMarker}
          //   onMouseout={this.onMouseoutMarker}
          // />
        )}
      </Map>
    );
  }

  onMouseoverMarker = (props, marker, e) => {
    if (this.state.called) {
      return null;
    } else {
      marker.setIcon({
        url: facebooklogo,
        scaledSize: new this.props.google.maps.Size(40, 40)
      });
      this.state.called = true;
      marker.setLabel({
        text: marker.label.text,
        fontWeight: "700",
        fontFamily:
          "Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",

        color: "white"
      });
    }
  };

  onMouseoutMarker = (props, marker, e) => {
    console.log(marker);
    this.state.called = false;
    marker.setIcon({
      url: meme2,
      scaledSize: new this.props.google.maps.Size(40, 40)
    });
    marker.setLabel({
      text: marker.label.text,
      fontWeight: "700",
      fontFamily:
        "Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",

      color: "black"
    });
  };
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCmgrSz2oQZHuMYoUoC0hD5VXpMZIyM0Bc"
})(MapContainer);
