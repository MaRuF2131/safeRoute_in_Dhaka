// components/MapComponent.js
'use client';

import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const dhakaCenter = { lat: 23.8103, lng: 90.4125 };

export default function MapComponent({ origin, destination, routeData }) {
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!origin || !destination || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  }, [origin, destination]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={dhakaCenter}
        zoom={13}
        onLoad={(map) => setMap(map)}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#1e2937" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
          ]
        }}
      >
        {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}

        {/* Example Building Safety Markers */}
        {routeData && (
          <>
            <Marker position={{ lat: 23.806, lng: 90.368 }} label={{ text: "Good", color: "#22c55e" }} />
            <Marker position={{ lat: 23.795, lng: 90.400 }} label={{ text: "Avg", color: "#eab308" }} />
            <Marker position={{ lat: 23.820, lng: 90.420 }} label={{ text: "Risk", color: "#ef4444" }} />
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
}