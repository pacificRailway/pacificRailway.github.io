// Updated pinsData object with corrected syntax
const pinsData = {
    1850: [
        {x: 100, y: 150, summary: "Event 1", link: "/events/event1.html" },
    ],
    1855: [
        {x: 200, y: 250, summary: "Event 2", link: "/events/event2.html" },
    ],
    1860: [
        {x: 300, y: 350, summary: "Event 3", link: "/events/event3.html" },
    ]
};

// Initialize the Leaflet map when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the Leaflet map
    const map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
        zoomSnap: 0.1,
        zoomDelta: 0.1,
    });

    // Define the image bounds (top-left and bottom-right corners)
    const imageBounds = [[0, 0], [5500, 6500]]; // Adjust these values to match your image dimensions

    // Add the image overlay
    const imageUrl = '../images/pnw-map.png'; // Correct relative path
    L.imageOverlay(imageUrl, imageBounds).addTo(map);

    // Set the initial view to show the whole image
    map.fitBounds(imageBounds);

    // Function to show pins for the selected year
    function showYear(year) {
        console.log(`Showing information for the year ${year}`);

        // Clear existing pins
        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Add new pins for the selected year
        if (pinsData[year]) {
            pinsData[year].forEach(pin => {
                const marker = L.marker([pin.y, pin.x]).addTo(map);
                marker.bindPopup(`
                    <p>${pin.summary}</p>
                    <a href="${pin.link}">Learn more</a>
                `);
            });
        }
    }

    // Initialize with the first year
    showYear(1850);

    // Attach showYear function to window for button clicks
    window.showYear = showYear;
});
