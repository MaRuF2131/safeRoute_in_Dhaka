// components/MapComponent.js
/* 'use client'; */

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Default marker icon fix for Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Dhaka City Center (এটাই তোমার মেইন ফোকাস)
const dhakaCenter = [23.8103, 90.4125];

export default function MapComponent({ routeData }) {
  // Mirpur → Motijheel এর একটা সুন্দর রুট (উদাহরণ)
  const dhakaSafeRoute = [
    [23.8065, 90.3685],   // Mirpur-10
    [23.8100, 90.3850],   // Mirpur-14
    [23.8030, 90.4050],   // Agargaon
    [23.7930, 90.4075],   // Farmgate
    [23.7580, 90.4170],   // Shahbagh
    [23.7335, 90.4175],   // Motijheel
  ];

  return (
    <MapContainer 
      center={dhakaCenter} 
      zoom={13.5}           // Dhaka শহরকে সুন্দর করে দেখাবে
      className="h-full w-full"
      scrollWheelZoom={true}
      zoomControl={true}
    >
      {/* OpenStreetMap Tile */}
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Default Dhaka View Marker (Optional) */}
      <Marker position={dhakaCenter}>
        <Popup>
          <strong>📍 Dhaka City Center</strong><br />
          Welcome to SafeRoute Dhaka
        </Popup>
      </Marker>

      {/* Safe Route Line - সবুজ রঙের */}
      {routeData && (
        <Polyline 
          positions={dhakaSafeRoute} 
          color="#22c55e" 
          weight={7} 
          opacity={0.9}
          lineCap="round"
        />
      )}

      {/* Building Safety Markers (Dhaka specific) */}
      {routeData && (
        <>
          {/* Good Condition */}
          <Marker position={[23.8065, 90.3685]}>
            <Popup>
              <span className="text-green-500">✅ Good</span><br />
              <strong>Mirpur-10 Market</strong>
            </Popup>
          </Marker>

          {/* Average */}
          <Marker position={[23.8030, 90.4050]}>
            <Popup>
              <span className="text-yellow-500">⚠️ Average</span><br />
              <strong>Agargaon / Technical Area</strong>
            </Popup>
          </Marker>

          {/* Poor / Risky */}
          <Marker position={[23.7335, 90.4175]}>
            <Popup>
              <span className="text-red-500">❌ Risky</span><br />
              <strong>Motijheel / DIT Avenue</strong>
            </Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
}