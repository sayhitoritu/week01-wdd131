// scripts/review.js

document.addEventListener("DOMContentLoaded", () => {
  // --- Read query parameters from URL --- //
  const params = new URLSearchParams(window.location.search);

  const productId = params.get("productName");
  const rating = params.get("rating");
  const installDate = params.get("installDate");
  const features = params.getAll("features"); // checkboxes
  const reviewText = params.get("reviewText");
  const userName = params.get("userName");

  // Optional: same products array to resolve ID to name
  const products = [
    {
      id: "fc-1888",
      name: "flux capacitor"
    },
    {
      id: "fc-2050",
      name: "power laces"
    },
    {
      id: "fs-1987",
      name: "time circuits"
    },
    {
      id: "ac-2000",
      name: "low voltage reactor"
    },
    {
      id: "jj-1969",
      name: "warp equalizer"
    }
  ];

  // Find product name from id
  let productNameDisplay = "Unknown product";
  if (productId) {
    const match = products.find((p) => p.id === productId);
    if (match) {
      productNameDisplay = match.name;
    }
  }

  // Fill summary fields
  const summaryProduct = document.getElementById("summaryProduct");
  const summaryRating = document.getElementById("summaryRating");
  const summaryDate = document.getElementById("summaryDate");
  const summaryFeatures = document.getElementById("summaryFeatures");
  const summaryName = document.getElementById("summaryName");

  if (summaryProduct) summaryProduct.textContent = productNameDisplay;
  if (summaryRating) summaryRating.textContent = rating || "—";
  if (summaryDate) summaryDate.textContent = installDate || "—";

  if (summaryFeatures) {
    if (features && features.length > 0) {
      summaryFeatures.textContent = features.join(", ");
    } else {
      summaryFeatures.textContent = "None selected";
    }
  }

  if (summaryName) summaryName.textContent = userName || "Anonymous";

  // --- LocalStorage review counter --- //
  const countSpan = document.getElementById("reviewCount");
  let count = Number(localStorage.getItem("reviewCount")) || 0;
  count += 1;
  localStorage.setItem("reviewCount", String(count));
  if (countSpan) {
    countSpan.textContent = count;
  }

  // --- Footer --- //
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const lastMod = document.getElementById("lastModified");
  if (lastMod) {
    lastMod.textContent = `Last Modified: ${document.lastModified}`;
  }
});
