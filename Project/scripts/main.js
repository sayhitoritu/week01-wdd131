// ---------- DATA ----------

const neighborhoods = [
    {
        id: 1,
        name: "Connaught Place",
        description:
            "Central circle with colonial buildings, offices, cafes, and easy metro access.",
        vibe: "central"
    },
    {
        id: 2,
        name: "Old Delhi (Chandni Chowk)",
        description:
            "Very busy lanes, famous street food, wholesale markets, and historic mosques.",
        vibe: "old-city"
    },
    {
        id: 3,
        name: "Hauz Khas",
        description:
            "Trendy area with cafes, art spaces, boutiques, and a historic lake complex.",
        vibe: "modern"
    }
];

const attractions = [
    {
        id: "india-gate",
        name: "India Gate",
        category: "heritage",
        area: "Central Delhi",
        bestTime: "Evening",
        description:
            "War memorial and popular promenade. Many visitors enjoy a walk here after sunset."
    },
    {
        id: "lotus-temple",
        name: "Lotus Temple",
        category: "spiritual",
        area: "South Delhi",
        bestTime: "Morning",
        description:
            "Bahá’í House of Worship with lotus-shaped design. Open to visitors of all faiths."
    },
    {
        id: "chandni-chowk",
        name: "Chandni Chowk",
        category: "market",
        area: "Old Delhi",
        bestTime: "Evening",
        description:
            "Historic market area with narrow lanes, spice shops, sweets, and famous street food."
    },
    {
        id: "lodhi-gardens",
        name: "Lodhi Gardens",
        category: "park",
        area: "South Delhi",
        bestTime: "Morning",
        description:
            "Large garden with walking paths and tombs. Good for peaceful walks and picnics."
    }
];

const FAVORITES_KEY = "nd_favorites";
const THEME_KEY = "nd_theme";
const TRIP_KEY = "nd_trip";

// ---------- LOCAL STORAGE HELPERS ----------

function getFavorites() {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function getTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
}

function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}

function getTripPlan() {
    const stored = localStorage.getItem(TRIP_KEY);
    return stored ? JSON.parse(stored) : null;
}

function saveTripPlan(plan) {
    localStorage.setItem(TRIP_KEY, JSON.stringify(plan));
}

// ---------- GENERAL RENDERING ----------

function renderYear() {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function applyTheme() {
    const theme = getTheme();
    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}

// ---------- HOME PAGE: NEIGHBORHOODS ----------

function renderNeighborhoods() {
    const container = document.getElementById("neighborhoodsContainer");
    if (!container) return;

    const favorites = getFavorites();

    const html = neighborhoods
        .map((place) => {
            const isFavorite = favorites.includes(place.id);
            const buttonText = isFavorite
                ? "Remove from favorites"
                : "Add to favorites";

            return `
        <article class="card">
          <h3>${place.name}</h3>
          <p>${place.description}</p>
          <button
            type="button"
            class="favorite-btn"
            data-id="${place.id}">
            ${buttonText}
          </button>
        </article>
      `;
        })
        .join("");

    container.innerHTML = html;

    container.querySelectorAll(".favorite-btn").forEach((button) => {
        button.addEventListener("click", handleFavoriteClick);
    });
}

function handleFavoriteClick(event) {
    const id = Number(event.target.dataset.id);
    let favorites = getFavorites();

    if (favorites.includes(id)) {
        // Remove favorite
        favorites = favorites.filter((favId) => favId !== id);
    } else {
        // Add favorite
        favorites.push(id);
    }

    saveFavorites(favorites);
    renderNeighborhoods();
}

// ---------- ATTRACTIONS PAGE ----------

function getAttractionImage(id) {
    if (id === "india-gate") {
        return "images/india-gate.jpg";
    }
    if (id === "lotus-temple") {
        return "images/lotus-temple.jpg";
    }
    if (id === "chandni-chowk") {
        return "images/chandni-chowk.jpg";
    }
    if (id === "lodhi-gardens") {
        return "images/lodhi-gardens.jpg";
    }
    return "images/india-gate.jpg";
}

function renderAttractions(category = "all") {
    const container = document.getElementById("attractionsContainer");
    if (!container) return;

    const filteredAttractions =
        category === "all"
            ? attractions
            : attractions.filter((item) => item.category === category);

    const html = filteredAttractions
        .map((item) => {
            const imagePath = getAttractionImage(item.id);

            return `
        <article class="card">
          <h3>${item.name}</h3>
          <img
            src="${imagePath}"
            alt="${item.name} in ${item.area}"
            loading="lazy" />
          <p><strong>Area:</strong> ${item.area}</p>
          <p><strong>Best time:</strong> ${item.bestTime}</p>
          <p>${item.description}</p>
        </article>
      `;
        })
        .join("");

    container.innerHTML = html;
}

function handleCategoryChange(event) {
    const selected = event.target.value;
    renderAttractions(selected);
}

// ---------- PLAN PAGE ----------

function interestLabel(value) {
    if (value === "heritage") {
        return "Heritage and history";
    }
    if (value === "food") {
        return "Street food";
    }
    if (value === "shopping") {
        return "Shopping";
    }
    if (value === "relaxing") {
        return "Parks and relaxing";
    }
    return "General sightseeing";
}

function handleTripSubmit(event) {
    event.preventDefault();

    const nameInput = document.getElementById("travelerName");
    const daysInput = document.getElementById("days");
    const budgetInput = document.getElementById("budget");
    const notesInput = document.getElementById("notes");
    const feedback = document.getElementById("tripFeedback");

    const selectedInterest = document.querySelector(
        'input[name="interest"]:checked'
    );

    const travelerName = nameInput ? nameInput.value.trim() : "";
    const days = daysInput ? Number(daysInput.value) : 0;
    const budget = budgetInput ? Number(budgetInput.value) : 0;
    const notes = notesInput ? notesInput.value.trim() : "";
    const interest = selectedInterest ? selectedInterest.value : "";

    if (!travelerName || !days || !budget || !interest) {
        if (feedback) {
            feedback.textContent = "Please complete all required fields.";
        }
        return;
    }

    const plan = {
        travelerName,
        days,
        budget,
        interest,
        notes
    };

    saveTripPlan(plan);
    renderTripSummary();

    if (feedback) {
        feedback.textContent = `Trip plan saved for ${travelerName}.`;
    }

    event.target.reset();
}

function renderTripSummary() {
    const summaryDiv = document.getElementById("tripSummary");
    if (!summaryDiv) return;

    const plan = getTripPlan();
    if (!plan) {
        summaryDiv.innerHTML = `<p>No trip plan has been saved yet.</p>`;
        return;
    }

    const interestText = interestLabel(plan.interest);

    summaryDiv.innerHTML = `
    <p><strong>Traveler:</strong> ${plan.travelerName}</p>
    <p><strong>Days in Delhi:</strong> ${plan.days}</p>
    <p><strong>Budget:</strong> ₹${plan.budget}</p>
    <p><strong>Main interest:</strong> ${interestText}</p>
    <p><strong>Notes:</strong> ${plan.notes || "No extra notes provided."}</p>
  `;
}

// ---------- THEME TOGGLE ----------

function toggleTheme() {
    const currentTheme = getTheme();
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    saveTheme(nextTheme);
    applyTheme();
}

// ---------- INIT ----------

document.addEventListener("DOMContentLoaded", () => {
    renderYear();
    applyTheme();

    const page = document.body.dataset.page;

    if (page === "home") {
        renderNeighborhoods();
    }

    if (page === "attractions") {
        renderAttractions();
        const categorySelect = document.getElementById("categoryFilter");
        if (categorySelect) {
            categorySelect.addEventListener("change", handleCategoryChange);
        }
    }

    if (page === "plan") {
        renderTripSummary();
        const tripForm = document.getElementById("tripForm");
        if (tripForm) {
            tripForm.addEventListener("submit", handleTripSubmit);
        }
    }

    const themeButton = document.getElementById("themeToggle");
    if (themeButton) {
        themeButton.addEventListener("click", toggleTheme);
    }
});