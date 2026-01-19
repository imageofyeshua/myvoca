// Import the display function from the other JS file
import { renderWords } from "./main.js";

async function initializeApp() {
  try {
    // 1. Import/Fetch the JSON file
    const response = await fetch("./day05.json");
    const userData = await response.json();

    // 2. Use the imported function to display the data
    renderWords(userData);
  } catch (error) {
    console.error("Failed to load application:", error);
  }
}

initializeApp();
