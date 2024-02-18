import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { getCurrentLocation } from "../../utils/helpers/getCurrentLocation";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGF3a3dhdGNodHJhY2tlciIsImEiOiJjbHAydndzMGwxNDRuMnFwYm56NXRhM2M1In0.9yb3DGjeaEoEoksYeGIpqw";

const MapBoxGl = ({
  onSelectedCustomer,
  onMapLoaded,
  customers,
  onLocation,
  loadingCustomers,
  intention,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(new mapboxgl.Marker());

  const [lng, setLng] = useState(0.0);
  const [lat, setLat] = useState(0.0);
  const [zoom, setZoom] = useState(10);

  const [loaded, setLoaded] = useState(false);

  const [geocoded, setGeocoded] = useState(false);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.on("load", () => {
        setLoaded(true);
        onMapLoaded();
      });
    }

    // Get current location using geolocation
    getCurrentLocation()
      .then((response) => {
        console.log(".then");
        setLocations(response);
      })
      .catch((error) => {
        console.log("error", error);
        setLocations(error);
      });
  }, []);

  useEffect(() => {
    if (geocoded && intention === "pick") {
      marker.current.setLngLat([lng, lat]).addTo(map.current);

      map.current.on("move", () => {
        const { lng, lat } = map.current.getCenter();
        setLng(lng.toFixed(6));
        setLat(lat.toFixed(6));

        // Update marker position as the map moves
        marker.current.setLngLat([lng, lat]);
      });

      map.current.on("moveend", () => {
        const { lng, lat } = map.current.getCenter();
        setLng(lng.toFixed(6));
        setLat(lat.toFixed(6));

        onLocation({ lat: lat, lng: lng });
      });
    }
  }, [geocoded, lat, lng, intention, onLocation]);

  useEffect(() => {
    if (!loadingCustomers && customers.length > 0) {
      map.current.flyTo({
        center: [customers[0].longitude, customers[0].latitude],
        essential: true, // This animation is considered essential with respect to prefers-reduced-motion
      });

      customers.forEach((customer) => {
        const customerMarker = new mapboxgl.Marker()
          .setLngLat([customer.longitude, customer.latitude])
          .addTo(map.current);

        customerMarker.getElement().addEventListener("click", () => {
          return onSelectedCustomer(customer);
        });
      });
    }
  }, [loadingCustomers]);

  const setLocations = (position) => {
    setGeocoded(true);

    setLat(() => position.location.latitude);
    setLng(() => position.location.longitude);

    map.current.setCenter([
      position.location.longitude,
      position.location.latitude,
    ]);

    onLocation({
      lat: position.location.latitude,
      lng: position.location.longitude,
    });
  };

  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: "100%", height: "500px" }}
      />
    </div>
  );
};

export default MapBoxGl;
