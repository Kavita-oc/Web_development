/* app.js — Activity 5: JavaScript Basics and User Interaction */

/**
 * Show a reusable toast notification.
 * @param {string} message   Text to display.
 * @param {string} [type]    "success" | "error" | "info" (controls colour).
 * @param {number} [duration] Milliseconds before the toast disappears.
 */
function showToast(message, type = "success", duration = 3000) {
  // Find the container, or create it the first time a toast is shown.
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.setAttribute("role", "status");     // announced by screen readers
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  // Build the toast element.
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  // Trigger the CSS entrance transition on the next frame.
  requestAnimationFrame(() => toast.classList.add("show"));

  // Fade out, then remove from the DOM.
  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    // Safety net in case transitionend never fires (e.g. reduced motion).
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/**
 * Smoothly scroll to an element and move keyboard focus to it.
 * @param {string} selector CSS selector of the target, e.g. "#booking-form".
 */
function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

  // Focus the first field once the scroll has had time to finish.
  const firstField = target.querySelector("input, select, textarea");
  if (firstField) setTimeout(() => firstField.focus({ preventScroll: true }), 600);
}

document.addEventListener("DOMContentLoaded", () => {
  // Every "Book" button in the match schedule.
  document.querySelectorAll(".book-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const match = button.dataset.match;

      // Pre-fill the booking form with the chosen match.
      const matchField = document.getElementById("match");
      if (matchField) matchField.value = match;

      scrollToSection("#booking-form");
      showToast(`Booking started for ${match}`, "success");
    });
  });

  // Booking form submission.
  const form = document.getElementById("booking-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // stay on the page for this activity

      const name = document.getElementById("name").value.trim();
      if (!name) {
        showToast("Please enter your name.", "error");
        return;
      }
      showToast(`Thanks ${name}, your booking is confirmed.`, "success", 4000);
      form.reset();
    });
  }
});
