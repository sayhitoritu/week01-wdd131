// scripts/place.js
// Show copyright year and last modified
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = 'Last Modification: ' + document.lastModified;

// Static weather values (for assignment)
// You can later replace these with API results.
const tempF = 50; // degrees Fahrenheit
const windMph = 5; // mph
const cond = 'Partly Cloudy';

// fill initial DOM
document.getElementById('temp').textContent = tempF;
document.getElementById('wind').textContent = windMph;
document.getElementById('cond').textContent = cond;

// Wind chill formula (imperial) — returned value rounded to one decimal
// Only calculate if temp <= 50 F AND wind > 3 mph (viable condition per spec).
function calculateWindChill(tempF, windMph) {
  // Standard NOAA formula for wind chill (°F)
  return 35.74 + 0.6215 * tempF - 35.75 * Math.pow(windMph, 0.16) + 0.4275 * tempF * Math.pow(windMph, 0.16);
}

(function updateWindChill() {
  const out = document.getElementById('windchill');
  if (tempF <= 50 && windMph > 3) {
    const wc = calculateWindChill(tempF, windMph);
    out.textContent = Math.round(wc * 10) / 10; // one decimal
  } else {
    out.textContent = 'N/A';
  }
})();


