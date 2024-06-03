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
    1839: "Prior to 1839, the Pacific Northwest was largely inhabited by Indigenous peoples who had thrived in the region for millennia. They lived in harmony with the land, relying on hunting, fishing, and agriculture for sustenance. The arrival of European explorers in the late 18th century brought significant changes to the region, introducing trade networks and disrupting traditional ways of life. Fur trading posts established by companies like the Hudson's Bay Company became centers of commerce, attracting settlers and shaping early interactions between Indigenous peoples and European traders.",
    1855: "The period between 1839 and 1855 witnessed a significant increase in exploration and settlement in the Pacific Northwest. The Oregon Trail, established in the 1830s, facilitated the westward migration of thousands of settlers seeking new opportunities in the fertile lands of Oregon and the Willamette Valley. The California Gold Rush of 1849 further spurred migration to the region, as prospectors traveled through the Pacific Northwest on their way to the goldfields. This influx of settlers led to increased tensions between Indigenous tribes and newcomers, resulting in conflicts such as the Cayuse War of 1847-1855.",
    1875: "The period between 1855 and 1875 was marked by rapid industrialization and the expansion of transportation networks, particularly the construction of railways. The completion of the First Transcontinental Railroad in 1869 revolutionized travel and trade in the region, connecting the Pacific Northwest to the rest of the United States and facilitating the movement of goods and people. Railways played a crucial role in the development of cities like Portland and Seattle, spurring economic growth and transforming them into major urban centers.",
    1900: "The late 19th century saw a period of immense growth and development in the Pacific Northwest, fueled by the expansion of railways and the rise of industries such as logging, mining, and agriculture. The completion of additional railway lines, such as the Northern Pacific Railway and the Great Northern Railway, further facilitated the transportation of natural resources to markets in the eastern United States. This period also witnessed significant social and cultural changes, as waves of immigrants from Europe and Asia arrived in the region, contributing to its diversity and shaping its identity.",
    1921: "The early 20th century marked a continuation of the economic and societal transformations initiated by the railway boom of the late 19th century. The Pacific Northwest emerged as a key player in the global economy, exporting timber, wheat, and other natural resources to markets around the world. The region also experienced significant urbanization, as cities expanded and diversified, fueled by immigration and industrial growth. However, this period was also characterized by labor unrest and social inequality, as workers fought for better wages and working conditions in industries dominated by powerful corporations."
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
        const contextDiv = document.getElementById('context');
        contextDiv.textContent = contextData[year]; // Make sure contextData is correctly defined
    
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
