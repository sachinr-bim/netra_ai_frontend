import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";

// Dummy coordinates for New York (you can replace them with actual geocoded data)
const locationCoordinates = {
  "Newyork Street, America": [40.7128, -74.0060],
};

export default function DashboardShopMap() {
  const shops = useSelector((state) => state.shops.shops);

  return (
    <MapContainer
      center={[37.0902, -95.7129]} // Center of USA
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {shops.map((shop) => {
        const position = locationCoordinates[shop.location];
        if (!position) return null;
        return (
          <Marker key={shop.id} position={position} icon={L.icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png", iconSize: [32, 32] })}>
            <Popup>
              <strong>{shop.name}</strong><br />
              {shop.location}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
