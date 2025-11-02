console.log("✅ getdates.js is successfully connected!");

// Display current year dynamically
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Display last modified date dynamically
document.getElementById("lastModified").textContent =
  "Last Modification: " + document.lastModified;