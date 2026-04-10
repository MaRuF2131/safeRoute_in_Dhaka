// components/MapComponent.js
'use client';

import dynamic from 'next/dynamic';
import { use, useEffect, useState } from 'react';

// Only the necessary components
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
);

const dhakaCenter = [23.8103, 90.4125];

export default function MapComponent({ routeData }) {
  const [isClient, setIsClient] = useState(false);
  const [mapType, setMapType] = useState('hybrid'); // 'street', 'satellite', 'hybrid'
  const [tileUrl, setTileUrl] = useState("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}");
  const [attribution, setAttribution] = useState('&copy; Google Hybrid (Satellite + Labels)');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Leaflet icon fix
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  useEffect(() => {

      // Tile URL according to map type
      if (mapType === 'satellite') {
        setTileUrl("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}");
        setAttribution('&copy; Google Satellite');
      } else if (mapType === 'hybrid') {
        setTileUrl("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}");
        setAttribution('&copy; Google Hybrid (Satellite + Labels)');
      }else{
        setTileUrl("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
        setAttribution('&copy; OpenStreetMap contributors');
      }
  }, [mapType]);

  if (!isClient) {
    return (
      <div className="h-full w-full bg-[#1e2937] flex items-center justify-center text-gray-400">
        Loading Dhaka Map...
      </div>
    );
  }

  const safeRoute = [
    [23.8065, 90.3685], [23.8100, 90.3850], [23.8030, 90.4050],
    [23.7930, 90.4075], [23.7580, 90.4170], [23.7335, 90.4175],
  ];


  return (
    <div className="relative h-full w-full">
      <MapContainer 
        center={dhakaCenter} 
        zoom={13.5} 
        className="h-full w-full"
        scrollWheelZoom={true}
      >
         {(mapType === 'satellite' || mapType === 'hybrid') ? (
                  <TileLayer
                     url={tileUrl}
                     subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                     maxZoom={20}
                     attribution={attribution}
                  />
         ):
         (
              <TileLayer
                url={tileUrl}
                maxZoom={20}
                attribution={attribution}
              />
         )       
        } 

            <TileLayer
                url={tileUrl}
                maxZoom={20}
                attribution={attribution}
              />

        {/* Safe Route Line */}
        {routeData && (
          <Polyline 
            positions={safeRoute} 
            color="#22c55e" 
            weight={7} 
            opacity={0.9}
          />
        )}

        {/* Markers */}
        {routeData && (
          <>
            <Marker position={[23.8065, 90.3685]}>
              <Popup>✅ Mirpur-10 - Good Condition</Popup>
            </Marker>
            <Marker position={[23.7335, 90.4175]}>
              <Popup>❌ Motijheel - Risky Area</Popup>
            </Marker>
          </>
        )}
      </MapContainer>

      {/* Map Type Switcher Buttons */}
      <div className="absolute top-4 right-4 bg-[#1e2937] p-2 rounded-2xl shadow-xl border border-gray-700 z-[1000] flex flex-col gap-1">
        <button
          onClick={() => setMapType('street')}
          className={`px-4 py-2 text-xs rounded-xl transition-all ${mapType === 'street' ? 'bg-green-500 text-black font-semibold' : 'hover:bg-gray-700'}`}
        >
          🛣️ Street
        </button>
        <button
          onClick={() => setMapType('satellite')}
          className={`px-4 py-2 text-xs rounded-xl transition-all ${mapType === 'satellite' ? 'bg-green-500 text-black font-semibold' : 'hover:bg-gray-700'}`}
        >
          🛰️ Satellite
        </button>
        <button
          onClick={() => setMapType('hybrid')}
          className={`px-4 py-2 text-xs rounded-xl transition-all ${mapType === 'hybrid' ? 'bg-green-500 text-black font-semibold' : 'hover:bg-gray-700'}`}
        >
          🛰️ Satellite + Labels
        </button>
      </div>
    </div>
  );
}