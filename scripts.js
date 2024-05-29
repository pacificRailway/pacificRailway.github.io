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

        // Remove the .selected class from all buttons
        document.querySelectorAll('#map-controls button').forEach(button => {
            button.classList.remove('selected');
        });

        // Add the .selected class to the button corresponding to the selected year
        document.querySelector(`#map-controls button[data-year="${year}"]`).classList.add('selected');

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

function moveForward() {
    // Get the currently selected year
    var currentYear = parseInt(document.querySelector('#map-controls .selected').dataset.year);

    // Increment the year by 5 and ensure it does not exceed 1950
    var newYear = Math.min(currentYear + 5, 1950);

    // Call the showYear function with the new year
    showYear(newYear);
}

function moveBackward() {
    // Get the currently selected year
    var currentYear = parseInt(document.querySelector('#map-controls .selected').dataset.year);

    // Decrement the year by 5 and ensure it does not go below 1850
    var newYear = Math.max(currentYear - 5, 1850);

    // Call the showYear function with the new year
    showYear(newYear);
}
