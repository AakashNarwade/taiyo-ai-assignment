import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importing marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Updating the default icon options
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapProps {
  countries: Array<{
    country: string;
    countryInfo: {
      lat: number;
      long: number;
    };
    active: number;
    recovered: number;
    deaths: number;
  }>;
}

const Map: React.FC<MapProps> = ({ countries }) => {
  const zoom = 4;
  const position: [number, number] = [20.5937, 78.9629]; // focusing position with lat-long of India

  return (
    <MapContainer
      className="h-screen"
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='<a href="https://github.com/AakashNarwade" target="_blank">Aakash Narwade</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {countries.map((country) => (
        <Marker
          key={country.country}
          position={[country.countryInfo.lat, country.countryInfo.long]}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{country.country}</h3>
              <p>Active: {country.active}</p>
              <p>Recovered: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
