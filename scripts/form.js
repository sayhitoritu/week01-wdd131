// scripts/form.js

// Product array (given in assignment)
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // Populate product select
  const select = document.getElementById("productName");
  if (select) {
    // First placeholder option
    const placeholder = document.createElement("option");
    placeholder.textContent = "Select a product...";
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    // Add options from array
    products.forEach((product) => {
      const opt = document.createElement("option");
      opt.value = product.id;        // value is the product ID
      opt.textContent = product.name; // visible text is the product name
      select.appendChild(opt);
    });
  }

  // Footer: current year and last modified
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const lastMod = document.getElementById("lastModified");
  if (lastMod) {
    lastMod.textContent = `Last Modified: ${document.lastModified}`;
  }
});

