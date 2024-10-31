document.addEventListener("DOMContentLoaded", function () {
    // Preload the background image
    const img = new Image();
    img.src = "1354102.png"; // Replace with your background image path
    img.onload = () => {
        // Remove loading overlay
        document.body.classList.add("loaded");
    };
});
