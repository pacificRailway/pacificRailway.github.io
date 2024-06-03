// Updated pinsData object with corrected syntax
const pinsData = {
    1839: [
        { x: 1765, y: 1285, summary: "Lewis and Clark Expedition (1804-1806): The expedition mapped the Pacific Northwest and provided valuable information about the region.", link: "/events/lewis-clark.html" },
        { x: 920, y: 1135, summary: "Astoria Established (1811): John Jacob Astor's Pacific Fur Company established Astoria, the first American settlement on the Pacific coast.", link: "/events/astoria.html" },
        { x: 2105, y: 1425, summary: "Oregon Trail (1830s): The establishment of the Oregon Trail facilitated westward migration and increased interest in the Pacific Northwest.", link: "/events/oregon-trail.html" },
        { x: 1270, y: 1445, summary: "Fort Vancouver (1824): The Hudson's Bay Company established Fort Vancouver, becoming a central hub for the fur trade in the region.", link: "/events/fort-vancouver.html" },
        { x: 1850, y: 460, summary: "Treaty of 1818: This treaty allowed for joint occupation of the Oregon Territory by the United States and Great Britain, setting the stage for future negotiations and settlement.", link: "/events/treaty-1818.html" }
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
    1839: `Prior to the late ninteenth century, the Pacific Northwest was largely inhabited by indigenous peoples who had thrived in the region for millennia. The area was characterized by dense forests, abundant wildlife, and a rugged landscape that presented both challenges and opportunities for exploration and settlement.`,
    1855: `The mid 19th century witnessed a significant increase in exploration and settlement in the Pacific Northwest. The Oregon Trail, established in the 1830s, facilitated the westward migration of settlers seeking land, economic opportunities, and a better life. This period also saw the signing of treaties between Indigenous tribes and the United States government, leading to the forced relocation of many Native American communities.`,
    1875: `After the development of the Oregon trail, rapid industrialization saw the expansion of transportation networks, particularly the construction of railways. The completion of the Transcontinental Railroad in 1869 connected the Pacific Northwest to the rest of the country, opening up new markets for goods and enabling the efficient transportation of people and resources across long distances.`,
    1900: `The late 19th century saw a period of immense growth and development in the Pacific Northwest, fueled by the expansion of railways and the rise of industries such as logging, mining, and agriculture. The influx of settlers, fueled by the promise of economic opportunities, led to the establishment of towns and cities throughout the region. However, this period also witnessed tensions between different groups vying for control over land and resources.`,
    1921: `The early 20th century marked a continuation of the economic and societal transformations initiated by the railway boom of the late 19th century. The Pacific Northwest experienced further urbanization and industrialization, as well as social and political changes driven by factors such as immigration, labor movements, and technological advancements. Despite challenges such as economic recessions and environmental degradation, the region continued to thrive and evolve.`
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
