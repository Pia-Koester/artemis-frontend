import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

export default function LocationMap({ location }) {
  const position = location.coordinates;
  const address = location.address;

  return (
    <MapContainer
      className="w-full h-full"
      center={position}
      zoom={16}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
}
