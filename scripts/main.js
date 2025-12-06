// main.js

// 1) Footer: year + last modified
function updateFooterInfo() {
    const yearSpan = document.getElementById('currentYear');
    const lastModified = document.getElementById('lastModified');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = `Last updated: ${document.lastModified}`;
    }
}

// 2) Mobile hamburger menu
function setupMenuToggle() {
    const menuButton = document.getElementById('menuButton');
    const nav = document.getElementById('mainNav');

    if (!menuButton || !nav) return;

    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.textContent = isOpen ? '✖' : '☰';
    });
}

// 3) Example attractions array + rendering (for attractions.html)
const attractions = [
    {
        name: "India Gate",
        area: "Central Delhi",
        type: "monument",
        bestTime: "Evening",
    },
    {
        name: "Red Fort",
        area: "Old Delhi",
        type: "fort",
        bestTime: "Morning",
    },
    {
        name: "Qutub Minar",
        area: "South Delhi",
        type: "monument",
        bestTime: "Morning",
    },
    {
        name: "Lotus Temple",
        area: "South Delhi",
        type: "temple",
        bestTime: "Afternoon",
    },
];

function renderAttractions(list) {
    const container = document.querySelector('#attractionsContainer');
    if (!container) return;

    container.innerHTML = '';

    list.forEach((place) => {
        const card = document.createElement('article');
        card.className = 'card';

        card.innerHTML = `
      <h3>${place.name}</h3>
      <p><strong>Area:</strong> ${place.area}</p>
      <p><strong>Place type:</strong> ${place.type}</p>
      <p><strong>Best time to visit:</strong> ${place.bestTime}</p>
    `;

        container.appendChild(card);
    });
}

// 4) Simple filter (e.g., only monuments)
function filterAttractions(type) {
    if (type === 'all') {
        renderAttractions(attractions);
    } else {
        const filtered = attractions.filter(place => place.type === type);
        renderAttractions(filtered);
    }
}

// 5) localStorage example (count visits to site)
function trackVisits() {
    const key = 'delhiVisitCount';
    const countSpan = document.getElementById('visitCount');
    if (!countSpan) return;

    let current = Number(localStorage.getItem(key)) || 0;
    current += 1;
    localStorage.setItem(key, String(current));

    countSpan.textContent = `You have visited this site ${current} time(s) on this browser.`;
}



// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    updateFooterInfo();
    setupMenuToggle();
    renderAttractions(attractions);   // only does something on attractions.html
    trackVisits();                    // only shows if #visitCount exists

    // optional: set up buttons to filter attractions
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.filter;
            filterAttractions(type);
        });
    });
});



