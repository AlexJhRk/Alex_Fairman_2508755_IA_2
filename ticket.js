/* ========================================
   CODING CONF - TICKET GENERATION
   Retrieves and displays saved registration.
   ======================================== */

const STORAGE_KEY = "codingConfRegistration";

// Retrieve registration data from browser storage.
const savedData = localStorage.getItem(STORAGE_KEY);

let registrationData = null;

try {
    registrationData = savedData ? JSON.parse(savedData) : null;
} catch (error) {
    registrationData = null;
}

// Check that all required registration data exists.
const hasValidData =
    registrationData &&
    typeof registrationData.fullName === "string" &&
    registrationData.fullName.trim() !== "" &&
    typeof registrationData.email === "string" &&
    typeof registrationData.github === "string" &&
    typeof registrationData.avatar === "string" &&
    registrationData.avatar.startsWith("data:image/") &&
    typeof registrationData.ticketSerial === "string";

// Redirect visitors who did not complete registration.
if (!hasValidData) {
    window.location.replace("index.html");
} else {
    // Display the attendee's name.
    document.getElementById("congratulations-name").textContent =
        registrationData.fullName;

    document.getElementById("ticket-name").textContent =
        registrationData.fullName;

    // Display the uploaded profile image.
    const avatar = document.getElementById("ticket-avatar");

    avatar.src = registrationData.avatar;
    avatar.alt = "Profile avatar for " + registrationData.fullName;

    // Display the ticket serial number.
    document.getElementById("ticket-serial").textContent =
        registrationData.ticketSerial;

    // Create the GitHub profile link.
    const githubLink = document.getElementById("ticket-github");
    const githubUsername = registrationData.github.substring(1);

    githubLink.textContent = registrationData.github;
    githubLink.href =
        "https://github.com/" + encodeURIComponent(githubUsername);


}
