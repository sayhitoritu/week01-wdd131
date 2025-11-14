// Display current year and last modified date
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Wind Chill calculation
function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

const temp = parseFloat(document.querySelector("#temp").textContent);
const wind = parseFloat(document.querySelector("#wind").textContent);
const chillElement = document.querySelector("#chill");

if (temp <= 10 && wind > 4.8) {
    chillElement.textContent = calculateWindChill(temp, wind).toFixed(1);
} else {
    chillElement.textContent = "N/A";
}

