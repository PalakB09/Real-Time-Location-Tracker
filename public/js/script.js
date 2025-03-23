const socket= io(); //connection req will go in the backend

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;

            console.log("Current Location:", latitude, longitude); // ✅ Debugging

            // Send location to the backend
            socket.emit("sendLocation", { latitude, longitude });
        },
        (error) => {
            console.error("Error getting location:", error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
} else {
    console.log("Geolocation is not supported by this browser.");
}



const map = L.map("map").setView([0, 0], 27); // Default view

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Open Street Map",
}).addTo(map);

const markers = {};

// ✅ Wait for geolocation to load, then set the map center
socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    console.log(`Received location from ${id}:`, latitude, longitude); // ✅ Debugging

    // ✅ Set map view to the latest received location
    if (!markers[id]) {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    } else {
        markers[id].setLatLng([latitude, longitude]);
    }

    // ✅ Set map view to the user's location (only if it's the first location update)
    map.setView([latitude, longitude], 27);
});

socket.on("remove-marker", (data) => {
    const { id } = data;

    console.log(`Removing marker for user ${id}`); // ✅ Debugging

    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});