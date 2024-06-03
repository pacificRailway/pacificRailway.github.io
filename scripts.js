// Updated pinsData object with corrected syntax
const pinsData = {
    1839: [
        { x: 100, y: 150, summary: "Event 1", link: "/events/event1.html" },
    ],
    1855: [
        { x: 200, y: 250, summary: "Event 2", link: "/events/event2.html" },
    ],
    1875: [
        { x: 300, y: 350, summary: "Event 3", link: "/events/event3.html" },
    ],
    1900: [
        { x: 400, y: 450, summary: "Event 4", link: "/events/event4.html" },
    ],
    1921: [
        { x: 500, y: 550, summary: "Event 5", link: "/events/event5.html" },
    ]
};

// Updated mapImages object to store map images for different years
const mapImages = {
    1839: '../images/1839_crop.png',
    1855: '../images/1855_crop.png',
    1875: '../images/1875_crop.png',
    1900: '../images/1900_crop.png',
    1921: '../images/1921_crop.png'
};

// Context information for each year
const contextData = {
    1839: "Context and key events for 1839.",
    1855: "Context and key events for 1855.",
    1875: "Context and key events for 1875.",
    1900: "Context and key events for 1900.",
    1921: "Context and key events for 1921."
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

    // Add the initial image overlay
    const initialImageUrl = mapImages[1839];
    let imageLayer = L.imageOverlay(initialImageUrl, imageBounds).addTo(map);

    // Set the initial view to show the whole image
    map.fitBounds(imageBounds);

    // Function to show pins for the selected year and change the map image
    function showYear(year) {
        console.log(`Showing information for the year ${year}`);

        // Change the map image
        imageLayer.setUrl(mapImages[year]);

        // Remove the .selected class from all buttons
        document.querySelectorAll('#map-controls button').forEach(button => {
            button.classList.remove('selected');
        });

        // Add the .selected class to the button corresponding to the selected year
        document.querySelector(`#map-controls button[data-year="${year}"]`).classList.add('selected');

        // Update the context information
        document.getElementById('context').textContent = contextData[year];

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
    showYear(1839);

    // Attach showYear function to window for button clicks
    window.showYear = showYear;
});
