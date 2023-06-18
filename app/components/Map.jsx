"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef();
  const [erroDrive, setErroDrive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userPoint = turf.point([latitude, longitude]);
          const tantaCoordinates = [30.786509, 31.000376];
          const tantaPoint = turf.point(tantaCoordinates);
          const distance = turf.distance(userPoint, tantaPoint, {
            units: "kilometers",
          });
          if (distance <= 35 && distance >= 28) {
            setErroDrive(false);
          } else {
            setErroDrive(true);
          }
          setUserLocation([latitude, longitude]);
          setSelectedLocation([latitude, longitude]);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, []);
  const handleLocationSelection = () => {
    if (userLocation) {
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?key=4efc6215dd6d4f6a9fb0a93d14ded2ee&q=${userLocation[0]},${userLocation[1]}`
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem(
            "userLocation",
            JSON.stringify([userLocation[0], userLocation[1], data.results[0]])
          );
          router.push("/")
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleMapMove = (event) => {
    const { lat, lng } = event.target.getCenter();
    setUserLocation([lat, lng]);
  };

  const handleMapMoveEnd = (event) => {
    const { lat, lng } = event.target.getCenter();
    const userPoint = turf.point([lng, lat]);
    const tantaCoordinates = [30.786509, 31.000376];
    const tantaPoint = turf.point(tantaCoordinates);
    const distance = turf.distance(userPoint, tantaPoint, {
      units: "kilometers",
    });
    if (distance <= 35 && distance >= 28) {
      setErroDrive(false);
    } else {
      setErroDrive(true);
    }
  };
  return (
    <div>
      {erroDrive && (
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            backgroundColor: "#555555",
            color: "white",
            padding: "5px",
            zIndex: "111111",
          }}
        >
          <p>هذا العنوان خارج منطقة التوصيل</p>
        </div>
      )}

      {userLocation && (
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: "100vh" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="Map data &copy; OpenStreetMap contributors"
          />
          <Marker position={userLocation} icon={customIcon} />
          <MapEvents onMove={handleMapMove} onMoveend={handleMapMoveEnd} />
        </MapContainer>
      )}
      <button onClick={handleLocationSelection}>تحديد الموقع</button>
    </div>
  );
};
const MapEvents = ({ onMove, onMoveend }) => {
  useMapEvents({
    move: onMove,
    moveend: onMoveend,
  });
};
const customIcon = new Icon({
  iconUrl: "/assets/img/loc.png",
  iconSize: [32, 32],
});
export default Map;
