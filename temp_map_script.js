
// === Google Maps Initialization ===
// This function must be in the global scope
window.initMap = function() {
    // Coordinates for 台北市大安區大安路二段160巷16號1樓
    const location = { lat: 25.028717, lng: 121.54548 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: location,
        gestureHandling: "cooperative", // Cooperative gesture handling
    });

    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "格綸設計工程有限公司",
        // Default Google Maps marker is red
    });

    const infoWindow = new google.maps.InfoWindow({
        content: '<div style="color: black; padding: 5px;"><strong>格綸設計工程有限公司</strong><br>台北市大安區大安路二段160巷16號1樓</div>'
    });

    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });
};
