import React, { Component } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  google
} from "google-maps-react";
import { Redirect } from "react-router";
export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
      lat_longs: [],
      username: ""
    };
  }

  onMapClicked = username => {
    this.setState({
      selected: true,
      username: username
    });
  };

  render() {
    const { selected, username, lat_longs } = this.state;

    if (selected) {
      return <Redirect to={`/users/${username}`} />;
      this.setState({
        selected: false
      });
    }

    const { arrOfLatLongs } = this.props;
    return (
      <div id="map"width="150px"height="150px">
        <Map
          google={this.props.google}
          initialCenter={{
            lat: 40.7128,
            lng: -73.935242
          }}
          zoom={9}
        >
          {arrOfLatLongs.map(latLong => (
            <Marker
              title={"user"}
              name={"user"}
              position={{ lat: latLong.latitude, lng: latLong.longitude }}
              onClick={() => this.onMapClicked()}
            />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAMySR4qXxtMWeAhlQVz5IzFwOPoG7dBO0"
})(MapContainer);