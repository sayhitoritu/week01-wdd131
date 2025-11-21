// ----------------- TEMPLE DATA -----------------
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  // ---------- YOUR 3 NEW TEMPLES ----------
  {
    templeName: "Manila Philippines",
    location: "Manila, Philippines",
    dedicated: "1984, September, 25",
    area: 26683,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manila-philippines/400x250/manila-philippines-temple-lds-685730-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41100,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/5-Rome-Temple-2160345.jpg"
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, USA",
    dedicated: "1919, November, 27",
    area: 42000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/laie-hawaii/400x250/laie-temple-772761-wallpaper.jpg"
  }
];

// ----------------- FUNCTIONS -----------------
const container = document.getElementById("templeContainer");

// create one temple card
function createCard(t) {
  return `
    <div class="card">
      <img src="${t.imageUrl}" loading="lazy" alt="${t.templeName}">
      <h3>${t.templeName}</h3>
      <p><strong>Location:</strong> ${t.location}</p>
      <p><strong>Dedicated:</strong> ${t.dedicated}</p>
      <p><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</p>
    </div>
  `;
}

// display array
function displayTemples(list) {
  container.innerHTML = list.map(createCard).join("");
}

// filters
function applyFilter(type) {
  let result = temples;

  if (type === "old") {
    result = temples.filter(t => parseInt(t.dedicated) < 1900);
  }

  if (type === "new") {
    result = temples.filter(t => parseInt(t.dedicated) > 2000);
  }

  if (type === "large") {
    result = temples.filter(t => t.area > 90000);
  }

  if (type === "small") {
    result = temples.filter(t => t.area < 10000);
  }

  displayTemples(result);
}

// ----------------- NAV MENU -----------------
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    applyFilter(link.dataset.filter);
  });
});

// ----------------- HAMBURGER -----------------
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  const expanded = navMenu.classList.contains("open");
  menuButton.setAttribute("aria-expanded", expanded);
  menuButton.textContent = expanded ? "✖" : "☰";
});

// ----------------- FOOTER -----------------
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;

// Display all by default
displayTemples(temples);
