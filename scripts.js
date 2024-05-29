const pinsData = {
    1850: [
        {x:100, y:150, summary: "Event 1", link: "/events/event1.html" },
    ]
    1855: [
        {x:200, y:250, summary: "Event 2", link: "/events/event3.html" },
    ]
    1860: [
        {x:300, y:350, summary: "Event 3", link: "/events/event3.html" },
    ]
}

function showYear(year) {
    console.log(`Showing information for the year ${year}`);

    const pinsContainer = document.getElementById('pins'); // Sets Pins
    pinsContainer.innerHTML = ''; // Clears Pins

    const summaryContainer = document.getElementById('summary'); // Sets summary
    summaryContainer.style.display = 'none'; // Clears summary
    
    if (pinsData[year]) {
        pinsData[year].forEach(pin => {
            const pinElement = document.createElement('div');
            pinElement.className = 'pin';
            pinElement.style.left = `${pin.x}px`;
            pinElement.style.top = `${pin.y}px`;
            pinElement.onclick = () => showSummary(pin);
            pinsContainer.appendChild(pinElement);
        });
    }
}

function showSummary(pin) {
    const summaryContainer = document.getElementById('summary');
    summaryContainer.style.left = `${pin.x + 20}px`;
    summaryContainer.style.top = `${pin.y}px`;    
    summaryContainer=innerHTML = `
        <p>${pin.summary}</p>
        <a href="${pin.link}">Learn more</a>
    `;
    summaryContainer.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    showYear(1850); // Default open
});